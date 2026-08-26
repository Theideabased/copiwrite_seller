export const WHATSAPP_SUPPORT_URL =
  "https://wa.me/2347013546734?text=Hello%20Copiwrite%2C%20I%20need%20help%20with%20my%20WhatsApp%20Views-to-Sales%20purchase.";

export const whatsappProductFiles = [
  {
    id: "whatsapp-views-to-sales",
    kind: "Main product",
    title: "WhatsApp Views-to-Sales",
    description: "The full step-by-step sales guide",
    filename: "WHATSAPP VIEWS TO SALES.pdf",
    downloadName: "WhatsApp-Views-to-Sales.pdf",
  },
  {
    id: "facebook-instagram-ads",
    kind: "Bonus 1",
    title: "Facebook and Instagram Ads Guide",
    description: "A simple guide to paid reach on Meta",
    filename: "Facebook and Instagram Ads Guide.pdf",
    downloadName: "Facebook-and-Instagram-Ads-Guide.pdf",
  },
  {
    id: "tiktok-ads",
    kind: "Bonus 2",
    title: "TikTok Ads Guide",
    description: "A clear guide to reaching buyers on TikTok",
    filename: "TikTok Ads Guide.pdf",
    downloadName: "TikTok-Ads-Guide.pdf",
  },
  {
    id: "social-media-optimization",
    kind: "Bonus 3",
    title: "Social Media Profile Optimization",
    description: "Make your sales pages clear and ready for buyers",
    filename: "Social Media Optimization.pdf",
    downloadName: "Social-Media-Profile-Optimization.pdf",
  },
] as const;

export type WhatsAppProductFileId = (typeof whatsappProductFiles)[number]["id"];

export function findWhatsAppProductFile(id: string) {
  return whatsappProductFiles.find((productFile) => productFile.id === id);
}
