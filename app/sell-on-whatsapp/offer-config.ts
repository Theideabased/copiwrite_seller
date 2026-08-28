function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

function displayNaira(value: string) {
  if (!value) return "Price coming soon";
  if (value.startsWith("₦")) return value;

  const numeric = Number(value.replaceAll(",", ""));
  return Number.isFinite(numeric)
    ? new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(numeric)
    : value;
}

const rawPrice = "10000";
const rawOriginalValue = clean(
  process.env.NEXT_PUBLIC_WHATSAPP_PRODUCT_ORIGINAL_VALUE,
);

// Update this one number whenever another verified buyer claims the audit.
const auditSlotLimit = 20;
const auditSlotsClaimed = 14;

export const offerConfig = {
  productName:
    clean(process.env.NEXT_PUBLIC_WHATSAPP_PRODUCT_NAME) ||
    "WhatsApp Views-to-Sales",
  price: displayNaira(rawPrice),
  originalValue: rawOriginalValue
    ? displayNaira(rawOriginalValue)
    : "",
  videoUrl: "https://youtu.be/mgkzd0ADS4s",
  checkoutUrl:
    clean(process.env.NEXT_PUBLIC_WHATSAPP_CHECKOUT_URL) ||
    "/sell-on-whatsapp/checkout",
  implementationUrl: clean(
    process.env.NEXT_PUBLIC_WHATSAPP_IMPLEMENTATION_URL,
  ),
  auditSlotLimit,
  auditSlotsClaimed: Math.min(Math.max(auditSlotsClaimed, 0), auditSlotLimit),
  hasConfiguredPrice: true,
};
