import type { Metadata } from "next";
import ExclusaoDeDadosClient from "./ExclusaoClient";

export const metadata: Metadata = {
  title: "Exclusão de Conta e Dados",
  description:
    "Solicite a exclusão da sua conta e dados pessoais do VAP-App. Conforme LGPD Art. 18, VI, você tem direito à eliminação dos seus dados a qualquer momento.",
  keywords: [
    "exclusão de dados VAP-App",
    "excluir conta app traqueostomia",
    "deletar dados pessoais",
    "LGPD direito exclusão",
    "direito ao esquecimento",
    "privacidade VAP-App",
    "remover conta",
  ],
  alternates: {
    canonical: "https://vap-app.com.br/exclusao-de-dados",
  },
  openGraph: {
    title: "Exclusão de Conta e Dados | VAP-App",
    description:
      "Solicite a exclusão da sua conta e dados pessoais do VAP-App. Direito garantido pela LGPD Art. 18, VI.",
    url: "https://vap-app.com.br/exclusao-de-dados",
    type: "website",
  },
};

export default function ExclusaoDeDadosPage() {
  return <ExclusaoDeDadosClient />;
}
