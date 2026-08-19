import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const WHATSAPP_PRODUCT = {
  id: "whatsapp-views-to-sales",
  name: "WhatsApp Views-to-Sales",
  amountKobo: 1_000_000,
  currency: "NGN",
} as const;

type Buyer = {
  name: string;
  email: string;
  phone: string;
};

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url?: string;
    access_code?: string;
    reference?: string;
  };
};

export type PaystackVerification = {
  status: boolean;
  message: string;
  data?: {
    status?: string;
    reference?: string;
    amount?: number;
    currency?: string;
    paid_at?: string | null;
    customer?: { email?: string };
    metadata?: unknown;
  };
};

function paystackKeys() {
  const publicKey = process.env.PAYSTACK_PUBLIC_KEY?.trim() || "";
  const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim() || "";

  if (!publicKey || !secretKey) {
    throw new Error("Paystack is not configured.");
  }

  const publicMode = publicKey.startsWith("pk_live_")
    ? "live"
    : publicKey.startsWith("pk_test_")
      ? "test"
      : "invalid";
  const secretMode = secretKey.startsWith("sk_live_")
    ? "live"
    : secretKey.startsWith("sk_test_")
      ? "test"
      : "invalid";

  if (publicMode === "invalid" || secretMode === "invalid" || publicMode !== secretMode) {
    throw new Error("The Paystack public and secret keys are invalid or use different modes.");
  }

  return { publicKey, secretKey, mode: publicMode };
}

export function getPaystackSecretKey() {
  return paystackKeys().secretKey;
}

function accessSecret() {
  return process.env.DELIVERY_ACCESS_SECRET?.trim() || getPaystackSecretKey();
}

export function createDeliveryAccessKey(reference: string) {
  return createHmac("sha256", accessSecret())
    .update(`${WHATSAPP_PRODUCT.id}:${reference}`)
    .digest("hex");
}

export function hasValidDeliveryAccessKey(reference: string, accessKey: string) {
  if (!/^[a-f0-9]{64}$/.test(accessKey)) return false;
  const expected = createDeliveryAccessKey(reference);
  return timingSafeEqual(Buffer.from(accessKey), Buffer.from(expected));
}

export function createDeliveryAccessPath(reference: string) {
  const accessKey = createDeliveryAccessKey(reference);
  return `/payment/access/${encodeURIComponent(reference)}?key=${accessKey}`;
}

export function createPaymentReference() {
  return `cwt-${Date.now()}-${randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

export async function initializePaystackTransaction({
  buyer,
  callbackUrl,
}: {
  buyer: Buyer;
  callbackUrl: string;
}) {
  const { secretKey } = paystackKeys();
  const reference = createPaymentReference();
  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify({
      email: buyer.email,
      amount: String(WHATSAPP_PRODUCT.amountKobo),
      currency: WHATSAPP_PRODUCT.currency,
      reference,
      callback_url: callbackUrl,
      metadata: JSON.stringify({
        product_id: WHATSAPP_PRODUCT.id,
        product_name: WHATSAPP_PRODUCT.name,
        buyer_name: buyer.name,
        whatsapp_number: buyer.phone,
        cancel_action: callbackUrl.replace(/\/payment\/verify\/?$/, "/sell-on-whatsapp/checkout"),
      }),
    }),
    cache: "no-store",
  });

  const result = (await response.json().catch(() => null)) as PaystackInitializeResponse | null;
  const authorizationUrl = result?.data?.authorization_url || "";
  const returnedReference = result?.data?.reference || "";

  if (!response.ok || !result?.status || !authorizationUrl || !returnedReference) {
    console.error("Paystack initialization failed:", result?.message || response.statusText);
    throw new Error("Payment could not be started. Please try again.");
  }

  const checkoutUrl = new URL(authorizationUrl);
  if (checkoutUrl.protocol !== "https:" || checkoutUrl.hostname !== "checkout.paystack.com") {
    throw new Error("Paystack returned an invalid checkout address.");
  }

  return { authorizationUrl: checkoutUrl.toString(), reference: returnedReference };
}

export async function verifyPaystackTransaction(reference: string) {
  const { secretKey } = paystackKeys();
  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Cache-Control": "no-cache",
      },
      cache: "no-store",
    },
  );

  const result = (await response.json().catch(() => null)) as PaystackVerification | null;
  if (!response.ok || !result?.status) {
    throw new Error(result?.message || "Payment verification failed.");
  }

  return result;
}

export function metadataRecord(metadata: unknown): Record<string, unknown> {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    return metadata as Record<string, unknown>;
  }

  if (typeof metadata === "string") {
    try {
      const parsed = JSON.parse(metadata) as unknown;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : {};
    } catch {
      return {};
    }
  }

  return {};
}

export function isCompletedProductPayment(verification: PaystackVerification) {
  const metadata = metadataRecord(verification.data?.metadata);
  return (
    verification.data?.status === "success" &&
    verification.data.amount === WHATSAPP_PRODUCT.amountKobo &&
    verification.data.currency === WHATSAPP_PRODUCT.currency &&
    metadata.product_id === WHATSAPP_PRODUCT.id
  );
}
