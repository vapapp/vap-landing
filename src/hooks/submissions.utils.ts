import { Submission } from "@/types";
import {
  funcionalidadesOptions,
  confiancaCuidadoOptions,
  momentoUsoAppOptions,
  utilidadeOutrasCondicoesOptions,
  nivelEstudoOptions,
  buscaInformacaoOptions,
  maiorBeneficioOptions,
} from "@/app/questionario/iniciar/constants";

/**
 * Função auxiliar para contar ocorrências de um valor em um array de submissões.
 * @param data - O array de submissões.
 * @param key - A chave do objeto a ser contada.
 * @param nameMap - Um mapa opcional para renomear as chaves no resultado.
 * @returns Um array de objetos com 'name' e 'value'.
 */
const calculateCounts = (
  data: Submission[],
  key: keyof Submission,
  nameMap?: { [key: string]: string }
) => {
  const counts: { [key: string]: number } = {};
  for (const item of data) {
    const value = item[key];
    if (value && typeof value === 'string') {
      const mappedName = nameMap && nameMap[value] ? nameMap[value] : value;
      counts[mappedName] = (counts[mappedName] || 0) + 1;
    } else if (Array.isArray(value)) {
      value.forEach(v => {
        const mappedName = nameMap && nameMap[v] ? nameMap[v] : v;
        counts[mappedName] = (counts[mappedName] || 0) + 1;
      });
    }
  }
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
};

/**
 * Processa o array bruto de submissões do Firestore e o transforma em dados
 * estruturados e prontos para serem exibidos nos gráficos do dashboard.
 * @param submissions - O array de submissões do questionário.
 * @returns Um objeto com todos os dados calculados e prontos para os gráficos.
 */
export function processSubmissionsData(submissions: Submission[]) {
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
  
  const momentosUsoMap: { [key: string]: string } = {};
  momentoUsoAppOptions.forEach(o => { momentosUsoMap[o] = o; });


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
  const momentosUsoData = calculateCounts(tqtSubmissions, "momentoUsoApp", momentosUsoMap);
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
          (s) => Array.isArray(s.momentoUsoApp) && s.momentoUsoApp.includes(momentoUsoAppOptions[1])
        ).length /
          tqtSubmissions.length) *
        100
      : 0;
  const insightUsoEmergencia =
    tqtSubmissions.length > 0
      ? (tqtSubmissions.filter(
          (s) => Array.isArray(s.momentoUsoApp) && s.momentoUsoApp.includes(momentoUsoAppOptions[0])
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

  const riscoGraveData = calculateCounts(tqtSubmissions, "riscoGrave");
  const apoioComunidadeData = calculateCounts(tqtSubmissions, "apoioComunidade");
  const vozFamiliasData = calculateCounts(tqtSubmissions, "importanciaVozFamilias");
  const pensouComprarData = calculateCounts(tqtSubmissions, "pensouComprarDispositivo");
  const dificuldadeCompraData = calculateCounts(
    tqtSubmissions.filter(
      (s) =>
        s.pensouComprarDispositivo &&
        s.pensouComprarDispositivo !== "Não, nunca precisei" &&
        s.pensouComprarDispositivo !==
          "Não sabia que era possível comprar por conta própria"
    ),
    "dificuldadeCompra"
  );


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
    riscoGraveData,
    apoioComunidadeData,
    vozFamiliasData,
    pensouComprarData,
    dificuldadeCompraData,
  };
}