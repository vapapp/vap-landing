import { Metadata } from "next";
import SuporteClient from "./SuporteClient";

export const metadata: Metadata = {
  title: "Suporte",
  description:
    "Central de suporte do VAP-App. Encontre respostas para suas dúvidas, requisitos do sistema, recursos do aplicativo e informações de contato.",
};

export default function SuportePage() {
  return <SuporteClient />;
}
