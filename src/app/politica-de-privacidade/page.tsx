import type { Metadata } from "next";
import PoliticaDePrivacidadeClient from "./PoliticaClient";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade do VAP-App em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos seus dados e os dados de saúde da criança traqueostomizada.",
  keywords: [
    "política de privacidade VAP-App",
    "LGPD traqueostomia",
    "proteção de dados saúde",
    "privacidade dados médicos",
    "dados sensíveis infantis",
    "privacidade infantil",
    "dados de saúde pediátrica",
  ],
  alternates: {
    canonical: "https://vap-app.com.br/politica-de-privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | VAP-App",
    description:
      "Política de Privacidade do VAP-App em conformidade com a LGPD. Saiba como seus dados são coletados, usados e protegidos.",
    url: "https://vap-app.com.br/politica-de-privacidade",
    type: "website",
  },
};

export default function PoliticaDePrivacidadePage() {
  return <PoliticaDePrivacidadeClient />;
}
