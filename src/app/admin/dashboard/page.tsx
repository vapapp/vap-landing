"use client";

import dynamic from "next/dynamic";
import { Users, BarChart3, HeartPulse, ThumbsUp } from "lucide-react";

import StatCard from "@/components/ui/StatCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "./Dashboard.module.css";

const DynamicVisaoGeralCharts = dynamic(
  () => import("@/components/charts/VisaoGeralCharts"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function DashboardPage() {
  const { processedData, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Visão Geral</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}
      {processedData && (
        <>
          <div className={styles.grid}>
            <StatCard
              title="Total de Respostas"
              value={processedData.totalRespostas}
              icon={<Users size={24} />}
              color="blue"
              tooltipText="Número total de questionários enviados."
            />
            <StatCard
              title="Taxa de Confiança"
              value={`${processedData.taxaConfianca}%`}
              icon={<ThumbsUp size={24} />}
              color="green"
              tooltipText="Percentual de cuidadores que se sentem 'Confiantes' ou 'Muito Confiantes' nos cuidados."
            />
            <StatCard
              title="Índice de Necessidade"
              value={`${processedData.necessidadeAlta}%`}
              icon={<HeartPulse size={24} />}
              color="red"
              tooltipText="Percentual de cuidadores que relataram sentir solidão 'Quase todos os dias' ou cujo maior medo é 'Não saber o que fazer a tempo'."
            />
            <StatCard
              title="Satisfação com o App"
              value={`${processedData.satisfacaoApp}%`}
              icon={<BarChart3 size={24} />}
              color="purple"
              tooltipText="Percentual de avaliações 'Essencial' ou 'Muito Útil' para as funcionalidades propostas."
            />
          </div>

          <div
            className={`${styles.grid} ${styles.fullWidth}`}
            style={{ marginTop: "1.5rem" }}
          >
            <DynamicVisaoGeralCharts processedData={processedData} />
          </div>
        </>
      )}
      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}
