import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nautic Talk — Comunicación adaptada a tu mundo",
  description:
    "Intercomunicadores Bluetooth profesionales para n\u00e1utica, ciclismo y entornos laborales. Audio cristalino, full-duplex, resistente al agua. Sistemas para 2 o 3 personas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
