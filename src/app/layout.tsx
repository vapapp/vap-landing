import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { FooterWrapper } from "@/components/ui/FooterWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://vap-app.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | VAP-App",
    default: "VAP-App: Apoio para Cuidadores de Crianças com Traqueostomia",
  },
  description:
    "Aplicativo gratuito de apoio para cuidadores de crianças com traqueostomia e necessidades respiratórias complexas. Quizzes educativos, assistente IA, diário de eventos, comunidade e muito mais.",
  keywords: [
    "traqueostomia pediátrica",
    "cuidadores traqueostomia",
    "app traqueostomia",
    "via aérea pediátrica",
    "VAP-App",
    "cuidado pediátrico",
    "assistente cuidadores",
    "criança traqueostomia",
    "app gratuito saúde",
    "suporte cuidadores",
  ],
  authors: [{ name: "INNOVA DIGITAL LTDA", url: BASE_URL }],
  creator: "INNOVA DIGITAL LTDA",
  publisher: "INNOVA DIGITAL LTDA",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: BASE_URL,
    siteName: "VAP-App",
    title: "VAP-App: Apoio para Cuidadores de Crianças com Traqueostomia",
    description:
      "Aplicativo gratuito de apoio para cuidadores de crianças com traqueostomia e necessidades respiratórias complexas. Disponível no Android.",
    images: [
      {
        url: "/images/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "VAP-App — Apoio para Cuidadores de Crianças com Traqueostomia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VAP-App: Apoio para Cuidadores de Crianças com Traqueostomia",
    description:
      "Aplicativo gratuito de apoio para cuidadores de crianças com traqueostomia e necessidades respiratórias complexas.",
    images: ["/images/brand/logo.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GoogleAnalytics />
        <AuthProvider>
          {children}
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
