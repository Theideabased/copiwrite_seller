import { NextRequest, NextResponse } from "next/server";
import { initializePaystackTransaction } from "@/lib/paystack";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const requests = new Map<string, number[]>();

type CheckoutPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
};

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replace(/[<>]/g, "").slice(0, max) : "";

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requests.get(ip) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  requests.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function callbackUrl(request: NextRequest) {
  const configured = process.env.PAYSTACK_CALLBACK_URL?.trim();
  const value = configured || new URL("/payment/verify", request.nextUrl.origin).toString();
  const parsed = new URL(value);

  if (!["https:", "http:"].includes(parsed.protocol)) {
    throw new Error("PAYSTACK_CALLBACK_URL must be a valid HTTP or HTTPS URL.");
  }

  return parsed.toString();
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many payment attempts. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  let payload: CheckoutPayload;
  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return NextResponse.json({ message: "We could not read your details." }, { status: 400 });
  }

  if (clean(payload.website, 100)) {
    return NextResponse.json({ message: "Payment could not be started." }, { status: 400 });
  }

  const buyer = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 200).toLowerCase(),
    phone: clean(payload.phone, 30).replace(/[^+\d\s()-]/g, ""),
  };

  if (buyer.name.length < 2 || !/^\S+@\S+\.\S+$/.test(buyer.email) || buyer.phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { message: "Enter your name, a valid email and a valid WhatsApp number." },
      { status: 422 },
    );
  }

  try {
    const transaction = await initializePaystackTransaction({
      buyer,
      callbackUrl: callbackUrl(request),
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Checkout initialization error:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { message: "Payment could not be started right now. Please try again." },
      { status: 502 },
    );
  }
}
