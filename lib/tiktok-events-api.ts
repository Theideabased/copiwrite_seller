import { createHash } from "node:crypto";
import type { PaystackVerification } from "@/lib/paystack";
import { metadataRecord, WHATSAPP_PRODUCT } from "@/lib/paystack";

const TIKTOK_PIXEL_ID = "DAJGBM3C77U2FG645JDG";
const TIKTOK_EVENTS_ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

type TikTokRequestContext = {
  ip?: string;
  userAgent?: string;
  url: string;
};

const sha256 = (value: string) =>
  createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("234")) return `+${digits}`;
  if (digits.startsWith("0")) return `+234${digits.slice(1)}`;
  return `+${digits}`;
};

export async function sendTikTokPurchaseEvent(
  verification: PaystackVerification,
  context: TikTokRequestContext,
) {
  const accessToken = process.env.TIKTOK_EVENTS_API_ACCESS_TOKEN?.trim();
  if (!accessToken) {
    console.info("TikTok Events API skipped: TIKTOK_EVENTS_API_ACCESS_TOKEN is missing.");
    return false;
  }

  const reference = verification.data?.reference || "";
  const metadata = metadataRecord(verification.data?.metadata);
  const email = verification.data?.customer?.email?.trim().toLowerCase() || "";
  const phone = normalizePhone(String(metadata.whatsapp_number || ""));
  const user: Record<string, string> = {};

  if (email) user.email = sha256(email);
  if (phone) user.phone = sha256(phone);
  if (email) user.external_id = sha256(email);
  if (metadata.tiktok_ttclid) user.ttclid = String(metadata.tiktok_ttclid);
  if (metadata.tiktok_ttp) user.ttp = String(metadata.tiktok_ttp);
  if (context.ip) user.ip = context.ip;
  if (context.userAgent) user.user_agent = context.userAgent;

  const amount = (verification.data?.amount || WHATSAPP_PRODUCT.amountKobo) / 100;
  const payload: Record<string, unknown> = {
    event_source: "web",
    event_source_id: TIKTOK_PIXEL_ID,
    data: [
      {
        event: "CompletePayment",
        event_time: Math.floor(Date.now() / 1000),
        event_id: `purchase_${reference}`,
        user,
        properties: {
          currency: WHATSAPP_PRODUCT.currency,
          value: amount,
          content_type: "product",
          content_id: WHATSAPP_PRODUCT.id,
          content_name: WHATSAPP_PRODUCT.name,
          contents: [
            {
              content_id: WHATSAPP_PRODUCT.id,
              content_name: WHATSAPP_PRODUCT.name,
              content_type: "product",
              quantity: 1,
              price: amount,
            },
          ],
        },
        page: { url: context.url },
      },
    ],
  };

  const testEventCode = process.env.TIKTOK_TEST_EVENT_CODE?.trim();
  if (testEventCode) payload.test_event_code = testEventCode;

  try {
    const response = await fetch(TIKTOK_EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
    const result = (await response.json().catch(() => null)) as
      | { code?: number; message?: string }
      | null;

    if (!response.ok || result?.code !== 0) {
      console.error("TikTok Events API failed:", result?.message || response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("TikTok Events API network failure:", error instanceof Error ? error.message : error);
    return false;
  }
}
