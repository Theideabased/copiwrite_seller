"use client";

import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type YouTubePlayer = {
  destroy: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
};

type YouTubePlayerStateEvent = {
  data: number;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          videoId: string;
          playerVars: Record<string, number>;
          events: {
            onReady: (event: { target: YouTubePlayer }) => void;
            onStateChange: (event: YouTubePlayerStateEvent) => void;
            onError: () => void;
          };
        },
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    window.onYouTubeIframeAPIReady = resolve;

    if (existingScript) {
      existingScript.addEventListener("error", () => reject(new Error("YouTube failed to load")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.addEventListener("error", () => reject(new Error("YouTube failed to load")), {
      once: true,
    });
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

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

type SalesVideoProps = {
  videoUrl: string;
  checkoutUrl: string;
  price: string;
};

export function SalesVideo({ videoUrl, checkoutUrl, price }: SalesVideoProps) {
  const embedUrl = youtubeEmbedUrl(videoUrl);
  const videoId = embedUrl.split("/embed/")[1] ?? "";
  const playerMountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const hasStartedRef = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [playerError, setPlayerError] = useState(false);
  const [playerAttempt, setPlayerAttempt] = useState(0);

  useEffect(() => {
    if (!videoId || !playerMountRef.current) return;

    let cancelled = false;

    loadYouTubeApi()
      .then(() => {
        if (cancelled || !window.YT?.Player || !playerMountRef.current) return;

        playerRef.current = new window.YT.Player(playerMountRef.current, {
          videoId,
          playerVars: {
            autoplay: 0,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onReady: (event) => {
              setPlayerReady(true);
              if (hasStartedRef.current) event.target.playVideo();
            },
            onStateChange: (event) => {
              if (event.data === 0) setHasEnded(true);
            },
            onError: () => setPlayerError(true),
          },
        });
      })
      .catch(() => setPlayerError(true));

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [playerAttempt, videoId]);

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
    const startVideo = () => {
      hasStartedRef.current = true;
      setPlayerError(false);
      setHasEnded(false);
      setHasStarted(true);
      if (playerReady) playerRef.current?.playVideo();
    };

    return (
      <div className={styles.videoPlayerShell} aria-label="WhatsApp Views-to-Sales presentation">
        <div key={playerAttempt} ref={playerMountRef} className={styles.videoMedia} />

        {!hasStarted && !playerError && (
          <button
            className={styles.videoStartButton}
            type="button"
            onClick={startVideo}
            style={{
              backgroundImage: `linear-gradient(rgba(8, 8, 8, 0.12), rgba(8, 8, 8, 0.58)), url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
            }}
            aria-label="Play the WhatsApp sales video"
          >
            <span className={styles.playButton} aria-hidden="true">
              <Play size={26} fill="currentColor" />
            </span>
            <strong>Tap to watch</strong>
            <span>The video will adjust to your network.</span>
          </button>
        )}

        {hasStarted && !playerReady && !playerError && (
          <span className={styles.videoLoading}>Starting video…</span>
        )}

        {playerError && (
          <div className={styles.videoError} role="alert">
            <strong>The video could not load.</strong>
            <span>Check your connection, then try again.</span>
            <button
              type="button"
              onClick={() => {
                youtubeApiPromise = null;
                setPlayerError(false);
                setPlayerReady(false);
                setPlayerAttempt((attempt) => attempt + 1);
              }}
            >
              Try again
            </button>
          </div>
        )}

        {hasEnded && (
          <div className={styles.videoEndCard}>
            <strong>Ready to use the full WhatsApp sales system?</strong>
            <a href={checkoutUrl}>Get instant access — {price}</a>
            <button
              type="button"
              onClick={() => {
                setHasEnded(false);
                hasStartedRef.current = true;
                playerRef.current?.seekTo(0, true);
                playerRef.current?.playVideo();
              }}
            >
              Watch again
            </button>
          </div>
        )}
      </div>
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
