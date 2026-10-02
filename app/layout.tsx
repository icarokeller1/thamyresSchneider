import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource/italiana/latin-400.css";
import "./globals.css";
import "./scroll-experience.css";
import "./instagram.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  title: "Thamyres Schneider | Secretária Executiva",
  description: "Sou Thamyres Schneider, secretária executiva em Porto Alegre, RS. Organizo sua rotina, cuido dos processos e conecto pessoas com atenção e propósito.",
  formatDetection: { telephone: false },
  keywords: ["Thamyres Schneider", "secretária executiva", "secretariado executivo", "gestão de processos", "Porto Alegre"],
  openGraph: {
    title: "Thamyres Schneider | Secretária Executiva",
    description: "Organizo sua rotina e cuido dos processos para transformar complexidade em clareza.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/thamyres-portrait.png", width: 1086, height: 1448, alt: "Thamyres Schneider" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
