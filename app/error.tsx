"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="page-state">
      <p className="eyebrow">Something went wrong</p>
      <h1>This page lost its train of thought.</h1>
      <p>Try loading it again. If the problem continues, email info@copiwrite.com.</p>
      <button className="button button-primary" type="button" onClick={reset}>Try again</button>
    </main>
  );
}
