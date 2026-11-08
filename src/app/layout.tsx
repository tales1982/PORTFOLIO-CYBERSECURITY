// The real root layout (with <html> and <body>) is app/[locale]/layout.tsx,
// so the lang attribute is correct in the server HTML.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
