import type { Metadata } from "next";
import ExclusaoDeDadosClient from "./ExclusaoClient";

export const metadata: Metadata = {
  title: "Exclusão de Conta e Dados | VapApp - Via Aérea Pediátrica",
  description:
    "Solicite a exclusão da sua conta e dados pessoais do VapApp. Conforme LGPD Art. 18, VI, você tem direito à eliminação dos seus dados a qualquer momento.",
  keywords: [
    "exclusão de dados",
    "excluir conta",
    "deletar dados",
    "LGPD",
    "direito ao esquecimento",
    "VapApp",
    "privacidade",
  ],
  openGraph: {
    title: "Exclusão de Conta e Dados | VapApp",
    description: "Solicite a exclusão da sua conta e dados pessoais do VapApp conforme LGPD",
    type: "website",
  },
};

export default function ExclusaoDeDadosPage() {
  return <ExclusaoDeDadosClient />;
}
