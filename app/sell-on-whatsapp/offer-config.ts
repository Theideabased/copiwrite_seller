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

const rawPrice =
  clean(process.env.NEXT_PUBLIC_WHATSAPP_PRODUCT_PRICE) || "5000";
const rawOriginalValue = clean(
  process.env.NEXT_PUBLIC_WHATSAPP_PRODUCT_ORIGINAL_VALUE,
);

export const offerConfig = {
  productName:
    clean(process.env.NEXT_PUBLIC_WHATSAPP_PRODUCT_NAME) ||
    "WhatsApp Views-to-Sales",
  price: displayNaira(rawPrice),
  originalValue: rawOriginalValue
    ? displayNaira(rawOriginalValue)
    : "",
  videoUrl: clean(process.env.NEXT_PUBLIC_WHATSAPP_VIDEO_URL),
  checkoutUrl:
    clean(process.env.NEXT_PUBLIC_WHATSAPP_CHECKOUT_URL) ||
    "/sell-on-whatsapp/checkout",
  implementationUrl: clean(
    process.env.NEXT_PUBLIC_WHATSAPP_IMPLEMENTATION_URL,
  ),
  hasConfiguredPrice: true,
};
