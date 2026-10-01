import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource/italiana/latin-400.css";
import "./globals.css";
import "./scroll-experience.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")),
  title: "Thamyres Schneider | Assessoria Executiva e Institucional",
  description: "Assessoria executiva e institucional com Thamyres Schneider. Gestão de processos, assessoria parlamentar e relações institucionais em Porto Alegre, RS.",
  keywords: ["Thamyres Schneider", "secretária executiva", "assessoria executiva", "gestão de processos", "Porto Alegre"],
  openGraph: {
    title: "Thamyres Schneider | Presença que organiza. Estratégia que conecta.",
    description: "Assessoria executiva e institucional para transformar complexidade em clareza.",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/thamyres-portrait.png", width: 1086, height: 1448, alt: "Thamyres Schneider" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
