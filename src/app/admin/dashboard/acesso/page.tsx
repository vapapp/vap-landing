"use client";

import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useSubmissions } from "@/hooks/useSubmissions";
import styles from "../Dashboard.module.css";


const DynamicAcessoCharts = dynamic(
  () => import("@/components/charts/AcessoCharts"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

function AcessoEAdvocaciaPage() {
  const { processedData, loading, error } = useSubmissions();

  return (
    <div>
      <h1 className={styles.title}>Acesso e Advocacia</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={styles.error}>Ocorreu um erro ao carregar os dados.</p>
      )}
      {processedData && (
        <div className={styles.grid}>
          <DynamicAcessoCharts processedData={processedData} />
        </div>
      )}
      {!loading && !processedData && <p>Nenhuma resposta foi enviada ainda.</p>}
    </div>
  );
}

export default AcessoEAdvocaciaPage;