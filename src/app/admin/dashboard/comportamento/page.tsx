"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "../Dashboard.module.css";

const DynamicComportamentoCharts = dynamic(
  () => import("@/components/charts/ComportamentoCharts"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

function ComportamentoPage() {
  const { processedData, submissions, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Comportamento e Sentimentos</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}
      {processedData && (
        <div className={styles.grid}>
          <DynamicComportamentoCharts
            processedData={processedData}
            submissions={submissions}
          />
        </div>
      )}
      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}

export default ComportamentoPage;
