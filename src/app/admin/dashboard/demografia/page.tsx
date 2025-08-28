"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "../Dashboard.module.css";

const DynamicDemografiaCharts = dynamic(
  () => import("@/components/charts/DemografiaCharts"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

function DemografiaPage() {
  const { processedData, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Demografia</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}
      {processedData && (
        <div className={styles.grid}>
          <DynamicDemografiaCharts processedData={processedData} />
        </div>
      )}
      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}

export default DemografiaPage;