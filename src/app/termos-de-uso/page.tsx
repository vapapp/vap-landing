import type { Metadata } from "next";
import TermosDeUsoClient from "./TermosClient";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de Uso do VAP-App. Leia as regras, condições e responsabilidades que se aplicam ao acesso e uso das funcionalidades do aplicativo para cuidadores de crianças com traqueostomia.",
  keywords: [
    "termos de uso VAP-App",
    "condições de uso app traqueostomia",
    "contrato usuário VAP-App",
    "LGPD cuidadores",
    "regras uso aplicativo saúde",
    "cuidadores criança traqueostomizada",
  ],
  alternates: {
    canonical: "https://vap-app.com.br/termos-de-uso",
  },
  openGraph: {
    title: "Termos de Uso | VAP-App",
    description:
      "Termos de Uso do VAP-App. Regras e condições para uso do aplicativo de apoio a cuidadores de crianças com traqueostomia.",
    url: "https://vap-app.com.br/termos-de-uso",
    type: "website",
  },
};

export default function TermosDeUsoPage() {
  return <TermosDeUsoClient />;
}
