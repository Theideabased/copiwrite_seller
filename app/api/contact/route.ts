import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;
const requests = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  budget?: unknown;
  message?: unknown;
  website?: unknown;
};

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";

const escapeTelegramHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many attempts. Please wait a few minutes or email us directly." }, { status: 429 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "The request could not be read. Please try again." }, { status: 400 });
  }

  if (clean(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 200).toLowerCase(),
    company: clean(payload.company, 150),
    service: clean(payload.service, 100),
    budget: clean(payload.budget, 50) || "Not specified",
    message: clean(payload.message, 2000),
  };

  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email) || !lead.service || lead.message.length < 20) {
    return NextResponse.json({ message: "Please complete the required fields and try again." }, { status: 422 });
  }

  // The VITE_* fallbacks keep the user's existing local .env working. Hosted
  // environments should use the server-only TELEGRAM_* names instead.
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || process.env.VITE_TELEGRAM_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || process.env.VITE_TELEGRAM_CHAT_ID;

  if (!telegramToken || !telegramChatId) {
    return NextResponse.json(
      { message: "Online enquiries are not configured yet. Please email info@copiwrite.com directly." },
      { status: 503 },
    );
  }

  const message = [
    "<b>New Copiwrite enquiry</b>",
    "",
    `<b>Name:</b> ${escapeTelegramHtml(lead.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(lead.email)}`,
    `<b>Company:</b> ${escapeTelegramHtml(lead.company || "Not specified")}`,
    `<b>Service:</b> ${escapeTelegramHtml(lead.service)}`,
    `<b>Budget:</b> ${escapeTelegramHtml(lead.budget)}`,
    "",
    "<b>Project details</b>",
    escapeTelegramHtml(lead.message),
  ].join("\n");

  const telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: telegramChatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!telegramResponse.ok) {
    const telegramError = (await telegramResponse.json().catch(() => null)) as { description?: string } | null;
    console.error("Telegram contact delivery failed:", telegramError?.description || telegramResponse.statusText);
    return NextResponse.json(
      { message: "We could not deliver your enquiry right now. Please email info@copiwrite.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
