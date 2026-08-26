"use client";

import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

function youtubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const videoId =
      parsed.hostname.includes("youtu.be")
        ? parsed.pathname.slice(1)
        : parsed.searchParams.get("v") ||
          (parsed.pathname.startsWith("/embed/")
            ? parsed.pathname.split("/")[2]
            : "");

    return videoId
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : "";
  } catch {
    return "";
  }
}

export function SalesVideo({ videoUrl }: { videoUrl: string }) {
  const embedUrl = youtubeEmbedUrl(videoUrl);

  if (!videoUrl) {
    return (
      <div className={styles.videoPlaceholder} role="img" aria-label="Sales video placeholder">
        <span className={styles.playButton} aria-hidden="true">
          <Play size={26} fill="currentColor" />
        </span>
        <div>
          <strong>Main sales video</strong>
          <span>Add your video URL to publish the presentation here.</span>
        </div>
      </div>
    );
  }

  if (embedUrl) {
    return (
      <iframe
        className={styles.videoMedia}
        src={embedUrl}
        title="WhatsApp Views-to-Sales presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video className={styles.videoMedia} controls preload="metadata">
      <source src={videoUrl} />
      Your browser does not support embedded video.
    </video>
  );
}

type MobileCtaProps = {
  checkoutUrl: string;
  price: string;
  hasConfiguredPrice: boolean;
};

export function MobileCta({
  checkoutUrl,
  price,
  hasConfiguredPrice,
}: MobileCtaProps) {
  const [priceReached, setPriceReached] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const priceSection = document.getElementById("price");
    if (!priceSection) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPriceReached(true);
      },
      { threshold: 0.15 },
    );
    observerRef.current.observe(priceSection);

    return () => observerRef.current?.disconnect();
  }, []);

  const href = priceReached ? checkoutUrl : "#offer";
  const label = priceReached
    ? hasConfiguredPrice
      ? `Get access: ${price}`
      : "Ask about access"
    : "See the step-by-step system";

  return (
    <div className={styles.mobileCta}>
      <a href={href}>
        {label} <ArrowRight size={17} aria-hidden="true" />
      </a>
    </div>
  );
}
