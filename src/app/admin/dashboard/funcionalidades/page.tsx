"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ChartCard from "@/components/ui/ChartCard";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "../Dashboard.module.css";

const DynamicFuncionalidadesChart = dynamic(
  () => import("@/components/charts/FuncionalidadesChart"),
  {
    ssr: false,
    loading: () => (
      <div style={{ height: "300px" }}>
        <LoadingSpinner />
      </div>
    ),
  }
);

function FuncionalidadesPage() {
  const { processedData, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Importância das Funcionalidades</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}
      {processedData && (
        <div className={`${styles.grid} ${styles.fullWidth}`}>
          <ChartCard
            title="Avaliação de cada funcionalidade pelos cuidadores"
            tooltipText="Cada barra representa uma funcionalidade proposta. As cores indicam a percentagem de cuidadores que avaliaram aquela funcionalidade como 'Essencial', 'Muito Útil', 'Útil', etc. A percentagem ao lado do título soma 'Essencial' e 'Muito Útil'."
          >
            <DynamicFuncionalidadesChart
              data={processedData.funcionalidadesData || []}
            />
          </ChartCard>
        </div>
      )}
      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}

export default FuncionalidadesPage;
