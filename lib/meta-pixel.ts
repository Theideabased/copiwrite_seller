"use client";

type MetaPixelEventName = "InitiateCheckout" | "Purchase";

type MetaPixelEventData = {
  value: number;
  currency: "NGN";
  content_name: string;
  content_ids: string[];
  content_type: "product";
  num_items: number;
};

type MetaPixel = (
  command: "track",
  eventName: MetaPixelEventName,
  data: MetaPixelEventData,
  options?: { eventID: string },
) => void;

declare global {
  interface Window {
    fbq?: MetaPixel;
  }
}

export const whatsappPixelEventData: MetaPixelEventData = {
  value: 10_000,
  currency: "NGN",
  content_name: "WhatsApp Views-to-Sales",
  content_ids: ["whatsapp-views-to-sales"],
  content_type: "product",
  num_items: 1,
};

export function trackMetaPixelEvent(
  eventName: MetaPixelEventName,
  eventId: string,
) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return false;
  window.fbq("track", eventName, whatsappPixelEventData, { eventID: eventId });
  return true;
}
