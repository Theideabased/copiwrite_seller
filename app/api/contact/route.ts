import { NextRequest, NextResponse } from "next/server";
import { validateDemo } from "@/lib/demo-request";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 4;
const requests = new Map<string, number[]>();

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  service?: unknown;
  businessWebsite?: unknown;
  industry?: unknown;
  leadSource?: unknown;
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

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ message: "Please send a valid demo request." }, { status: 400 });
  }

  // Keep the old honeypot separate from the visible businessWebsite field.
  if (clean(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 200).toLowerCase(),
    company: clean(payload.company, 150),
    service: clean(payload.service, 100),
    businessWebsite: clean(payload.businessWebsite, 300),
    industry: clean(payload.industry, 100),
    leadSource: clean(payload.leadSource, 100),
    message: clean(payload.message, 2000),
  };

  const errors = validateDemo(lead);
  if (Object.keys(errors).length) {
    return NextResponse.json({ message: "Please check the highlighted fields and try again.", errors }, { status: 422 });
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
    "<b>New Copiwrite automation demo request</b>",
    "",
    `<b>Name:</b> ${escapeTelegramHtml(lead.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(lead.email)}`,
    `<b>Company:</b> ${escapeTelegramHtml(lead.company || "Not specified")}`,
    `<b>Website:</b> ${escapeTelegramHtml(lead.businessWebsite || "Not provided")}`,
    `<b>Industry:</b> ${escapeTelegramHtml(lead.industry)}`,
    `<b>Lead source:</b> ${escapeTelegramHtml(lead.leadSource)}`,
    `<b>Automation needed:</b> ${escapeTelegramHtml(lead.service)}`,
    "",
    "<b>Current sales process</b>",
    escapeTelegramHtml(lead.message),
  ].join("\n");

  let telegramResponse: Response;
  try {
    telegramResponse = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(15000),
      body: JSON.stringify({
        chat_id: telegramChatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  } catch {
    console.error("Telegram demo request delivery failed: network error or timeout.");
    return NextResponse.json({ message: "We could not deliver your request. Please try again or email info@copiwrite.com." }, { status: 502 });
  }

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
