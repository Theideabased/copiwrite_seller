"use client";

import { useEffect } from "react";
import { trackTikTokPixelEvent } from "@/lib/tiktok-pixel";

const MAX_ATTEMPTS = 20;
const RETRY_DELAY_MS = 250;

export function TikTokViewContentEvent() {
  useEffect(() => {
    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const eventId = `view_content_${Date.now()}`;

    const trackView = () => {
      attempts += 1;
      if (trackTikTokPixelEvent("ViewContent", eventId)) return;
      if (attempts < MAX_ATTEMPTS) retryTimer = setTimeout(trackView, RETRY_DELAY_MS);
    };

    trackView();
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, []);

  return null;
}

