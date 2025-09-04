"use client";

import { useMemo } from "react";
import { useSubmissions } from "@/hooks/useSubmissions";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import styles from "./Ouvidoria.module.css";
import dashboardStyles from "../Dashboard.module.css";

export default function OuvidoriaPage() {
  const { submissions, loading, error } = useSubmissions();

  const feedbacks = useMemo(() => {
    return submissions.filter(
      (s) => s.sugestaoFinal && s.sugestaoFinal.trim() !== ""
    );
  }, [submissions]);

  return (
    <div>
      <h1 className={dashboardStyles.title}>Ouvidoria</h1>
      {loading && <LoadingSpinner />}
      {error && (
        <p className={dashboardStyles.error}>
          Ocorreu um erro ao carregar os dados.
        </p>
      )}
      {!loading && feedbacks.length === 0 && (
        <p>Nenhuma sugestão ou feedback foi enviado até o momento.</p>
      )}
      {!loading && feedbacks.length > 0 && (
        <div className={styles.feedbackGrid}>
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className={styles.feedbackCard}>
              <div className={styles.cardHeader}>
                <p className={styles.userName}>{feedback.nome}</p>
                <p className={styles.userContact}>{feedback.contato}</p>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.feedbackMessage}>{feedback.sugestaoFinal}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}