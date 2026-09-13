"use client";

type TikTokEventName = "ViewContent" | "InitiateCheckout" | "CompletePayment";

type TikTokEventData = {
  value: number;
  currency: "NGN";
  content_name: string;
  content_id: string;
  content_type: "product";
  quantity: number;
  contents: Array<{
    content_id: string;
    content_name: string;
    content_type: "product";
    quantity: number;
    price: number;
  }>;
};

type TikTokPixel = {
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
  content_name: "WhatsApp Views-to-Sales",
  content_id: "whatsapp-views-to-sales",
  content_type: "product",
  quantity: 1,
  contents: [
    {
      content_id: "whatsapp-views-to-sales",
      content_name: "WhatsApp Views-to-Sales",
      content_type: "product",
      quantity: 1,
      price: 5_000,
    },
  ],
};

export function trackTikTokPixelEvent(eventName: TikTokEventName, eventId: string) {
  if (typeof window === "undefined" || typeof window.ttq?.track !== "function") return false;
  window.ttq.track(eventName, whatsappTikTokEventData, { event_id: eventId });
  return true;
}

