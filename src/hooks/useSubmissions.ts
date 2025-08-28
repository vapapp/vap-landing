"use client";

import { useState, useEffect, useMemo } from "react";
import {
  collection,
  onSnapshot,
  query,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import {
  funcionalidadesOptions,
  confiancaCuidadoOptions,
  momentoUsoAppOptions,
  utilidadeOutrasCondicoesOptions,
  nivelEstudoOptions,
  buscaInformacaoOptions,
  maiorBeneficioOptions,
} from "@/app/questionario/iniciar/constants";

export interface Submission extends DocumentData {
  id: string;
}

const calculateCounts = (
  data: Submission[],
  key: keyof Submission,
  nameMap?: { [key: string]: string }
) => {
  const counts: { [key: string]: number } = {};
  for (const item of data) {
    const value = item[key];
    if (value) {
      const mappedName = nameMap && nameMap[value] ? nameMap[value] : value;
      counts[mappedName] = (counts[mappedName] || 0) + 1;
    }
  }
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

/**
 * Hook customizado para buscar e processar as submissões do questionário.
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

  const processedData = useMemo(() => {
    if (submissions.length === 0) return null;

    const tqtSubmissions = submissions.filter(
      (s) => s.usaTraqueostomia === "Sim"
    );
    const naoTqtSubmissions = submissions.filter(
      (s) => s.usaTraqueostomia === "Não"
    );

    const totalRespostas = submissions.length;

    const taxaConfianca =
      tqtSubmissions.length > 0
        ? (tqtSubmissions.filter(
            (s) =>
              s.confiancaCuidado === confiancaCuidadoOptions[0] ||
              s.confiancaCuidado === confiancaCuidadoOptions[1]
          ).length /
            tqtSubmissions.length) *
          100
        : 0;

    const necessidadeAlta =
      tqtSubmissions.length > 0
        ? (tqtSubmissions.filter(
            (s) =>
              s.maiorMedo === "Não saber o que fazer a tempo." ||
              s.sentimentoApoio === "Quase todos os dias."
          ).length /
            tqtSubmissions.length) *
          100
        : 0;

    let totalSatisfacaoScore = 0;
    let totalFuncionalidadesAvaliadas = 0;
    tqtSubmissions.forEach((sub) => {
      funcionalidadesOptions.forEach((func) => {
        const rating = sub[`func_${func.id}`];
        if (rating) {
          totalFuncionalidadesAvaliadas++;
          if (rating === "Essencial" || rating === "Muito Útil") {
            totalSatisfacaoScore++;
          }
        }
      });
    });
    const satisfacaoApp =
      totalFuncionalidadesAvaliadas > 0
        ? (totalSatisfacaoScore / totalFuncionalidadesAvaliadas) * 100
        : 0;

    const escolaridadeMap: { [key: string]: string } = {
      [nivelEstudoOptions[0]]: "Nao estudou",
      [nivelEstudoOptions[1]]: "Fund. Incompleto",
      [nivelEstudoOptions[2]]: "Fund./Médio Inc.",
      [nivelEstudoOptions[3]]: "Médio Completo",
      [nivelEstudoOptions[4]]: "Superior",
      [nivelEstudoOptions[5]]: "Pós-Graduação",
    };

    const confiancaMap: { [key: string]: string } = {
      [confiancaCuidadoOptions[0]]: "Muito Confiante",
      [confiancaCuidadoOptions[1]]: "Confiante",
      [confiancaCuidadoOptions[2]]: "Pouco Confiante",
      [confiancaCuidadoOptions[3]]: "Inseguro",
    };

    const momentosUsoMap: { [key: string]: string } = {
      [momentoUsoAppOptions[0]]: "Emergencia",
      [momentoUsoAppOptions[1]]: "Dia a dia",
      [momentoUsoAppOptions[2]]: "Duvidas especificas",
      [momentoUsoAppOptions[3]]: "Antes consulta",
    };

    const buscaInfoMap: { [key: string]: string } = {
      [buscaInformacaoOptions[0]]: "Liga med/hos",
      [buscaInformacaoOptions[1]]: "Google e sites",
      [buscaInformacaoOptions[2]]: "Apps e redes",
      [buscaInformacaoOptions[3]]: "Material impresso",
      [buscaInformacaoOptions[4]]: "Nao sei onde",
    };

    const beneficiosMap: { [key: string]: string } = {
      [maiorBeneficioOptions[0]]: "Mais segurança",
      [maiorBeneficioOptions[1]]: "Organizacao/tempo",
      [maiorBeneficioOptions[2]]: "Menos solidão",
      [maiorBeneficioOptions[3]]: "Acesso informação",
    };

    const escolaridadeData = calculateCounts(
      submissions,
      "nivelEstudo",
      escolaridadeMap
    );
    const parentescoData = calculateCounts(tqtSubmissions, "parentesco");

    const momentosUsoDataRaw = calculateCounts(
      tqtSubmissions,
      "momentoUsoApp",
      momentosUsoMap
    );
    const buscaInfoDataRaw = calculateCounts(
      tqtSubmissions,
      "buscaInformacao",
      buscaInfoMap
    );
    const beneficiosData = calculateCounts(
      tqtSubmissions,
      "maiorBeneficio",
      beneficiosMap
    );

    const momentosUsoOrder = Object.values(momentosUsoMap);
    const momentosUsoData = momentosUsoOrder
      .map(
        (name) =>
          momentosUsoDataRaw.find((item) => item.name === name) || {
            name,
            value: 0,
          }
      )
      .filter((item) => item.value > 0);

    const buscaInfoOrder = Object.values(buscaInfoMap);
    const buscaInfoData = buscaInfoOrder
      .map(
        (name) =>
          buscaInfoDataRaw.find((item) => item.name === name) || {
            name,
            value: 0,
          }
      )
      .filter((item) => item.value > 0);

    const medosData = calculateCounts(tqtSubmissions, "maiorMedo");
    const solidaoData = calculateCounts(tqtSubmissions, "sentimentoApoio");

    const confiancaDataRaw = calculateCounts(
      tqtSubmissions,
      "confiancaCuidado",
      confiancaMap
    );
    const confiancaOrder = [
      "Muito Confiante",
      "Confiante",
      "Pouco Confiante",
      "Inseguro",
    ];
    const confiancaData = confiancaOrder.map(
      (name) =>
        confiancaDataRaw.find((item) => item.name === name) || {
          name,
          value: 0,
        }
    );

    const intubacaoData = calculateCounts(naoTqtSubmissions, "filhoIntubado");

    const funcionalidadesData = funcionalidadesOptions.map((func) => {
      const counts = calculateCounts(tqtSubmissions, `func_${func.id}`);
      const total = counts.reduce((acc, item) => acc + item.value, 0);
      const percentages = counts.reduce((obj, item) => {
        obj[item.name] = total > 0 ? (item.value / total) * 100 : 0;
        return obj;
      }, {} as { [key: string]: number });
      return { name: func.label, ...percentages };
    });

    const insightUsoDiario =
      tqtSubmissions.length > 0
        ? (tqtSubmissions.filter(
            (s) => s.momentoUsoApp === momentoUsoAppOptions[1]
          ).length /
            tqtSubmissions.length) *
          100
        : 0;
    const insightUsoEmergencia =
      tqtSubmissions.length > 0
        ? (tqtSubmissions.filter(
            (s) => s.momentoUsoApp === momentoUsoAppOptions[0]
          ).length /
            tqtSubmissions.length) *
          100
        : 0;
    const insightAcreditamUtil =
      naoTqtSubmissions.length > 0
        ? (naoTqtSubmissions.filter(
            (s) =>
              s.utilidadeOutrasCondicoes === utilidadeOutrasCondicoesOptions[0]
          ).length /
            naoTqtSubmissions.length) *
          100
        : 0;

    return {
      totalRespostas,
      taxaConfianca: Math.round(taxaConfianca),
      necessidadeAlta: Math.round(necessidadeAlta),
      satisfacaoApp: Math.round(satisfacaoApp),
      escolaridadeData,
      parentescoData,
      momentosUsoData,
      medosData,
      buscaInfoData,
      beneficiosData,
      funcionalidadesData,
      solidaoData,
      confiancaData,
      intubacaoData,
      insightUsoDiario: Math.round(insightUsoDiario),
      insightUsoEmergencia: Math.round(insightUsoEmergencia),
      insightAcreditamUtil: Math.round(insightAcreditamUtil),
    };
  }, [submissions]);

  return { submissions, loading, error, processedData };
};