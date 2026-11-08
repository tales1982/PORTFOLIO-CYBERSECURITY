// Shown for paths outside /en and /fr. The root layout renders no <html>,
// so this page provides its own.
export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', background: '#16181b', color: '#ebe8e1', display: 'grid', placeItems: 'center', minHeight: '100vh', margin: 0 }}>
        <main style={{ textAlign: 'center', padding: '1rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Page not found</h1>
          <p><a href="/en" style={{ color: '#eaa43c' }}>Go to the home page</a></p>
        </main>
      </body>
    </html>
  );
}
