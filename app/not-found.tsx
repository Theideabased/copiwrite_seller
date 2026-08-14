import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-state">
      <p className="eyebrow">404</p>
      <h1>This page has been edited out.</h1>
      <p>The link may be old, or the page may have moved.</p>
      <Link className="button button-primary" href="/">Return home</Link>
    </main>
  );
}
