"use client";

import { useEffect } from "react";
import { trackMetaPixelEvent } from "@/lib/meta-pixel";
import {
  identifyTikTokUser,
  type TikTokIdentity,
  trackTikTokPixelEvent,
} from "@/lib/tiktok-pixel";

const MAX_ATTEMPTS = 20;
const RETRY_DELAY_MS = 250;

export function PurchaseEvent({
  reference,
  identity,
}: {
  reference: string;
  identity: TikTokIdentity;
}) {
  useEffect(() => {
    const metaStorageKey = `copiwrite-meta-purchase:${reference}`;
    const tiktokStorageKey = `copiwrite-tiktok-purchase:${reference}`;
    let metaTracked = false;
    let tiktokTracked = false;
    try {
      metaTracked = Boolean(window.localStorage.getItem(metaStorageKey));
      tiktokTracked = Boolean(window.localStorage.getItem(tiktokStorageKey));
    } catch {
      // Tracking can still run when browser storage is blocked.
    }

    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const trackPurchase = () => {
      attempts += 1;
      if (!metaTracked) metaTracked = trackMetaPixelEvent("Purchase", `purchase_${reference}`);
      if (!tiktokTracked) {
        identifyTikTokUser(identity);
        tiktokTracked = trackTikTokPixelEvent("Purchase", `purchase_${reference}`);
      }

      if (metaTracked || tiktokTracked) {
        try {
          if (metaTracked) window.localStorage.setItem(metaStorageKey, "1");
          if (tiktokTracked) window.localStorage.setItem(tiktokStorageKey, "1");
        } catch {
          // Events were sent even if browser storage is blocked.
        }
      }

      if (metaTracked && tiktokTracked) {
        return;
      }

      if (attempts < MAX_ATTEMPTS) {
        retryTimer = setTimeout(trackPurchase, RETRY_DELAY_MS);
      }
    };

    trackPurchase();
    return () => {
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [identity, reference]);

  return null;
}
