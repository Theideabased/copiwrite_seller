"use client";

import { useEffect } from "react";
import { trackMetaPixelEvent } from "@/lib/meta-pixel";

const MAX_ATTEMPTS = 20;
const RETRY_DELAY_MS = 250;

export function PurchaseEvent({ reference }: { reference: string }) {
  useEffect(() => {
    const storageKey = `copiwrite-meta-purchase:${reference}`;

    try {
      if (window.localStorage.getItem(storageKey)) return;
    } catch {
      // Tracking can still run when browser storage is blocked.
    }

    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const trackPurchase = () => {
      attempts += 1;
      const tracked = trackMetaPixelEvent("Purchase", `purchase_${reference}`);

      if (tracked) {
        try {
          window.localStorage.setItem(storageKey, "1");
        } catch {
          // The Meta event was sent even if browser storage is blocked.
        }
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
  }, [reference]);

  return null;
}
