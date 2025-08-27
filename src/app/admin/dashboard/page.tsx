"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import StatCard from "@/components/ui/StatCard";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "./Dashboard.module.css";

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);
const AlertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);
const TrendingUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const DynamicVisaoGeralCharts = dynamic(
  () => import("@/components/charts/VisaoGeralCharts"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

function VisaoGeralPage() {
  const { processedData, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Visão Geral</h1>

      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}

      {processedData && (
        <div className={styles.grid}>
          <StatCard
            title="Total de Respostas"
            value={processedData.totalRespostas}
            icon={<UsersIcon />}
            color="blue"
          />
          <StatCard
            title="Taxa de Confiança"
            value={`${processedData.taxaConfianca}%`}
            icon={<HeartIcon />}
            color="green"
          />
          <StatCard
            title="Necessidade Alta"
            value={`${processedData.necessidadeAlta}%`}
            icon={<AlertIcon />}
            color="red"
          />
          <StatCard
            title="Satisfação App"
            value={`${processedData.satisfacaoApp}%`}
            icon={<TrendingUpIcon />}
            color="purple"
          />
          <DynamicVisaoGeralCharts processedData={processedData} />
        </div>
      )}

      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}

export default VisaoGeralPage;
