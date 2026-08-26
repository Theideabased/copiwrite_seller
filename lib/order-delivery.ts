import {
  createDeliveryAccessPath,
  metadataRecord,
  type PaystackVerification,
} from "@/lib/paystack";
import { WHATSAPP_SUPPORT_URL } from "@/lib/whatsapp-product-files";

const deliveryState = globalThis as typeof globalThis & {
  copiwriteTelegramReferences?: Set<string>;
};
const telegramReferences =
  deliveryState.copiwriteTelegramReferences ?? new Set<string>();
deliveryState.copiwriteTelegramReferences = telegramReferences;

function fetchErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return "Unknown network error";
  const cause = error.cause as { code?: string; message?: string } | undefined;
  return [error.message, cause?.code || cause?.message].filter(Boolean).join("  ");
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function siteOrigin(fallbackOrigin: string) {
  const callbackUrl = process.env.PAYSTACK_CALLBACK_URL?.trim();
  if (callbackUrl) {
    try {
      return new URL(callbackUrl).origin;
    } catch {
      // Use the verified request origin below when the configured URL is invalid.
    }
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) return `https://${vercelHost.replace(/^https?:\/\//, "")}`;
  return new URL(fallbackOrigin).origin;
}

export function deliveryAccessUrl(reference: string, fallbackOrigin: string) {
  return new URL(createDeliveryAccessPath(reference), siteOrigin(fallbackOrigin)).toString();
}

function buyerDetails(verification: PaystackVerification) {
  const metadata = metadataRecord(verification.data?.metadata);
  return {
    reference: verification.data?.reference || "",
    name: String(metadata.buyer_name || "Customer"),
    phone: String(metadata.whatsapp_number || ""),
    email: verification.data?.customer?.email || "",
  };
}

function whatsappUrl(phone: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11) digits = `234${digits.slice(1)}`;
  return digits.length >= 10 ? `https://wa.me/${digits}` : undefined;
}

async function sendAccessEmail(verification: PaystackVerification, accessUrl: string) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM?.trim();
  const replyTo = process.env.CONTACT_REPLY_TO?.trim();
  const { email, name, reference } = buyerDetails(verification);

  if (!apiKey || !from || !email) {
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !from && "CONTACT_FROM",
      !email && "buyer email from Paystack",
    ].filter(Boolean);
    console.error(`Purchase email skipped. Missing: ${missing.join(", ")}.`);
    return false;
  }

  const firstName = name.split(/\s+/)[0] || "there";
  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `whatsapp-guide-${reference}`,
      },
      body: JSON.stringify({
        from,
        ...(replyTo ? { reply_to: replyTo } : {}),
        to: [email],
        subject: "Your WhatsApp Views-to-Sales guides are ready",
        html: `
          <div style="background:#f4f8f5;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#172d22">
            <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #d5e3d9;padding:32px">
              <div style="margin:0 0 28px;font-size:14px;font-weight:800;color:#173d29"><span style="display:inline-block;width:30px;height:30px;margin-right:9px;border-radius:50%;background:#167548;color:#fff;font-family:Georgia,serif;font-size:18px;line-height:30px;text-align:center;vertical-align:middle">W</span>WhatsApp Views-to-Sales</div>
              <p style="margin:0 0 12px;color:#17653f;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">Payment confirmed</p>
              <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:32px;line-height:1.1;color:#172d22">Your guides are ready, ${escapeHtml(firstName)}.</h1>
              <p style="margin:0 0 24px;line-height:1.65;color:#4f6659">Open your private access page to download the main WhatsApp Views-to-Sales guide and your three bonus guides.</p>
              <a href="${escapeHtml(accessUrl)}" style="display:inline-block;background:#167548;color:#fff;text-decoration:none;font-weight:700;padding:14px 20px;border-radius:6px">Open your guides</a>
              <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#4f6659">Keep this email. Your payment reference is <strong>${escapeHtml(reference)}</strong>.</p>
              <p style="margin:12px 0 0;font-size:13px;line-height:1.6;color:#4f6659">Need help? <a href="${escapeHtml(WHATSAPP_SUPPORT_URL)}" style="color:#17653f;font-weight:700">Message us on WhatsApp</a> or reply to this email.</p>
            </div>
          </div>`,
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error(`Purchase email network failure: ${fetchErrorMessage(error)}.`);
    return false;
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { message?: string } | null;
    console.error("Purchase email failed:", error?.message || response.statusText);
  }
  return response.ok;
}

async function notifyTelegram(verification: PaystackVerification, accessUrl: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) {
    console.error("Purchase Telegram alert skipped: Telegram credentials are missing.");
    return false;
  }

  const { reference, name, phone, email } = buyerDetails(verification);
  if (telegramReferences.has(reference)) return true;
  const message = [
    "<b>New WhatsApp Views-to-Sales purchase</b>",
    "",
    "<b>Amount:</b> ₦10,000",
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email || "Not provided")}`,
    `<b>WhatsApp:</b> ${escapeHtml(phone || "Not provided")}`,
    `<b>Reference:</b> <code>${escapeHtml(reference)}</code>`,
    "",
    "Payment is verified. Message this buyer now.",
  ].join("\n");
  const contactUrl = whatsappUrl(phone);
  const inlineKeyboard = [
    ...(contactUrl ? [[{ text: `Message ${name.split(/\s+/)[0] || "buyer"} on WhatsApp`, url: contactUrl }]] : []),
    [{ text: "Open buyer access page", url: accessUrl }],
  ];

  let response: Response;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: inlineKeyboard },
      }),
      cache: "no-store",
    });
  } catch (error) {
    console.error(`Purchase Telegram network failure: ${fetchErrorMessage(error)}.`);
    return false;
  }

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { description?: string } | null;
    console.error("Purchase Telegram alert failed:", error?.description || response.statusText);
  }
  if (response.ok) telegramReferences.add(reference);
  return response.ok;
}

export async function deliverCompletedOrder(
  verification: PaystackVerification,
  fallbackOrigin: string,
) {
  const reference = verification.data?.reference || "";
  const accessUrl = deliveryAccessUrl(reference, fallbackOrigin);

  // Resend's idempotency key prevents duplicate buyer emails when the callback is reloaded.
  // Run both deliveries so a temporary email problem never delays the Telegram sales alert.
  const [emailSent, telegramSent] = await Promise.all([
    sendAccessEmail(verification, accessUrl),
    notifyTelegram(verification, accessUrl),
  ]);
  return emailSent && telegramSent;
}
