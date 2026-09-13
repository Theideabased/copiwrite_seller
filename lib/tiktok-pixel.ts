"use client";

type TikTokEventName = "ViewContent" | "InitiateCheckout" | "Purchase";

export type TikTokIdentity = {
  email?: string;
  phone_number?: string;
  external_id?: string;
};

type TikTokEventData = {
  value: number;
  currency: "NGN";
  contents: Array<{
    content_id: string;
    content_name: string;
    content_type: "product";
    price: number;
  }>;
};

type TikTokPixel = {
  identify: (identity: TikTokIdentity) => void;
  track: (
    eventName: TikTokEventName,
    data: TikTokEventData,
    options?: { event_id: string },
  ) => void;
};

declare global {
  interface Window {
    ttq?: TikTokPixel;
  }
}

export const whatsappTikTokEventData: TikTokEventData = {
  value: 5_000,
  currency: "NGN",
  contents: [
    {
      content_id: "whatsapp-views-to-sales",
      content_name: "WhatsApp Views-to-Sales",
      content_type: "product",
      price: 5_000,
    },
  ],
};

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  return `+${digits}`;
};

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function identifyTikTokUser(identity: TikTokIdentity) {
  if (typeof window === "undefined" || typeof window.ttq?.identify !== "function") return false;
  window.ttq.identify(identity);
  return true;
}

export async function identifyTikTokUserFromPii(email: string, phone: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPhone = normalizePhone(phone);
  if (!normalizedEmail && !normalizedPhone) return false;

  const [hashedEmail, hashedPhone] = await Promise.all([
    normalizedEmail ? sha256(normalizedEmail) : Promise.resolve(""),
    normalizedPhone ? sha256(normalizedPhone) : Promise.resolve(""),
  ]);

  return identifyTikTokUser({
    ...(hashedEmail ? { email: hashedEmail, external_id: hashedEmail } : {}),
    ...(hashedPhone ? { phone_number: hashedPhone } : {}),
  });
}

export function trackTikTokPixelEvent(eventName: TikTokEventName, eventId: string) {
  if (typeof window === "undefined" || typeof window.ttq?.track !== "function") return false;
  window.ttq.track(eventName, whatsappTikTokEventData, { event_id: eventId });
  return true;
}
