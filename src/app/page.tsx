import type { Metadata } from "next";
import { AppHero } from "../components/ui/AppHero";
import { AppVideoDemo } from "../components/ui/AppVideoDemo";
import { AppFeatures } from "../components/ui/AppFeatures";
import { AppScreenshots } from "../components/ui/AppScreenshots";
import { AppCTA } from "../components/ui/AppCTA";
import LightRays from "../components/ui/LightRays";
import styles from './Home.module.css';

export const metadata: Metadata = {
  title: "VAP-App: Apoio para Cuidadores de Crianças com Traqueostomia",
  description:
    "Baixe o VAP-App gratuitamente. Quizzes educativos, assistente Dr. VAP, diário de eventos, comunidade de cuidadores e ebooks sobre traqueostomia pediátrica. Disponível no Google Play.",
  alternates: {
    canonical: "https://vap-app.com.br",
  },
  openGraph: {
    title: "VAP-App: Apoio para Cuidadores de Crianças com Traqueostomia",
    description:
      "Baixe o VAP-App gratuitamente. Suporte completo para cuidadores de crianças com traqueostomia — quizzes, assistente IA, comunidade e muito mais.",
    url: "https://vap-app.com.br",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className={styles.main}>

      <div className={styles.background}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00949D"
          raysSpeed={0.6}
          lightSpread={0.5}
          rayLength={1.0}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.03}
          distortion={0.03}
        />
      </div>

      <div className={styles.content}>
        <AppHero />
        <AppVideoDemo />
        <AppFeatures />
        <AppScreenshots />
        <AppCTA />
      </div>

    </main>
  );
}