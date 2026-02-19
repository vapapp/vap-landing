import { Metadata } from "next";
import SuporteClient from "./SuporteClient";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de suporte do VAP-App. Encontre respostas para suas dúvidas sobre traqueostomia pediátrica, requisitos do app, funcionalidades e como entrar em contato com nossa equipe.",
  keywords: [
    "suporte VAP-App",
    "ajuda traqueostomia",
    "central de suporte",
    "FAQ VAP-App",
    "dúvidas app traqueostomia",
    "contato suporte",
  ],
  alternates: {
    canonical: "https://vap-app.com.br/suporte",
  },
  openGraph: {
    title: "Suporte | VAP-App",
    description:
      "Central de suporte do VAP-App. Tire suas dúvidas sobre o aplicativo para cuidadores de crianças com traqueostomia.",
    url: "https://vap-app.com.br/suporte",
    type: "website",
  },
};

export default function SuportePage() {
  return <SuporteClient />;
}
