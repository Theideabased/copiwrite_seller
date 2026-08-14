export default function Loading() {
  return (
    <main className="page-state" aria-busy="true" aria-label="Loading Copiwrite">
      <div className="state-logo skeleton" />
      <div className="state-title skeleton" />
      <div className="state-copy skeleton" />
    </main>
  );
}
