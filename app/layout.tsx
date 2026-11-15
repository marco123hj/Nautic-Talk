// Next.js requires a root layout. The real html/body live in app/[locale]/layout.tsx
// so the lang attribute reflects the active locale.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
