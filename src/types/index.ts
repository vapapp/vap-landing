import { DocumentData } from "firebase/firestore";

/**
 * Define a estrutura dos dados do formulário do questionário.
 * Cada chave corresponde a um campo do formulário.
 */
export interface FormData {
  [key: string]: string | boolean | undefined | string[];
  nome?: string;
  contato?: string;
  cep?: string;
  rua?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  naoTemCep?: boolean; 
  nivelEstudo?: string;
  usaTraqueostomia?: 'Sim' | 'Não' | '';
  aceitouTermosPesquisa?: boolean;
  aceitouContatoFuturo?: boolean;
  parentesco?: string;
  maiorMedo?: string;
  riscoGrave?: string[];
  sentimentoApoio?: string;
  confiancaCuidado?: string;
  buscaInformacao?: string;
  momentoUsoApp?: string[];
  importanciaApp?: string;
  maiorBeneficio?: string;
  cuidaOutraCondicao?: 'Sim' | 'Não';
  utilidadeOutrasCondicoes?: string;
  filhoIntubado?: string;
  sabiaRiscosIntubacao?: string;
  explicaramRiscosTQT?: string;
  medoIntubacao?: string;
  importanciaVozFamilias?: string;
  pensouComprarDispositivo?: string;
  dificuldadeCompra?: string;
  apoioComunidade?: string;
  sugestaoFinal?: string; 
}

/**
 * Define a estrutura de uma submissão de questionário vinda do Firestore.
 * Estende DocumentData para compatibilidade com o Firebase.
 */
export interface Submission extends DocumentData {
  id: string;
}