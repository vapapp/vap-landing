"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Submission } from "@/types";
import { processSubmissionsData } from "./submissions.utils"; 

/**
 * Hook customizado para buscar e processar as submissões do questionário.
 * - Busca os dados do Firestore em tempo real.
 * - Utiliza uma função externa para processar e calcular os dados para os gráficos.
 */
export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "respostasQuestionario"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const subs: Submission[] = [];
        querySnapshot.forEach((doc) => {
          subs.push({ id: doc.id, ...doc.data() } as Submission);
        });
        setSubmissions(subs);
        setLoading(false);
      },
      (err) => {
        console.error("Erro ao buscar submissões:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  
  const processedData = useMemo(
    () => processSubmissionsData(submissions),
    [submissions]
  );

  return { submissions, loading, error, processedData };
};