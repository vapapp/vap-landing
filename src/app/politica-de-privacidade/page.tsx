import type { Metadata } from "next";
import PoliticaDePrivacidadeClient from "./PoliticaClient";

export const metadata: Metadata = {
  title: "Política de Privacidade | VapApp - Via Aérea Pediátrica",
  description:
    "Política de Privacidade do VapApp em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos seus dados e os dados de saúde da criança traqueostomizada.",
  keywords: [
    "política de privacidade",
    "LGPD",
    "proteção de dados",
    "VapApp",
    "dados sensíveis",
    "privacidade infantil",
    "dados de saúde",
  ],
  openGraph: {
    title: "Política de Privacidade | VapApp",
    description: "Política de Privacidade do VapApp em conformidade com a LGPD",
    type: "website",
  },
};

export default function PoliticaDePrivacidadePage() {
  return <PoliticaDePrivacidadeClient />;
}
