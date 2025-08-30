/**
 * Constantes para o formulário do questionário.
 */

export const nivelEstudoOptions = [
  'Não estudei',
  'Ensino Fundamental incompleto',
  'Ensino Fundamental completo / Médio incompleto',
  'Ensino Médio completo',
  'Ensino Superior (completo ou incompleto)',
  'Pós-Graduação ou mais',
];

export const parentescoOptions = [
  'Mãe',
  'Pai',
  'Avó/Avô',
  'Outro familiar',
  'Cuidador(a) profissional',
];

export const maiorMedoOptions = [
  'Não saber o que fazer a tempo.',
  'Não conseguir contatar um médico ou serviço de emergência rapidamente.',
  'Tomar a decisão errada por conta própria.',
  'O equipamento (aspirador, ventilador) falhar.',
];

export const riscoGraveOptions = [
    'Obstrução da cânula (entupimento por secreção)',
    'Desconexão do ventilador ou oxigênio sem percepção',
    'Saída acidental completa da cânula (decanulação)',
    'Deslocamento da cânula (mal posicionamento)',
    'Sangramento grave pela traqueostomia',
    'Infecção respiratória grave e rápida',
    'Aspiração de alimento ou objeto pela cânula',
    'Falha de equipamento essencial (aspirador, ventilador)',
    'Colapso do pulmão (pneumotórax) devido à ventilação',
    'Emergência durante transporte (fora de casa)',
    'Outro',
];

export const sentimentoApoioOptions = [
  'Quase todos os dias.',
  'Algumas vezes por semana.',
  'Algumas vezes por mês.',
  'Raramente ou nunca.',
];

export const confiancaCuidadoOptions = [
    'Muito confiante, sinto que sei como agir na maioria das situações.',
    'Confiante, mas ainda tenho dúvidas em situações incomuns.',
    'Pouco confiante, me sinto inseguro(a) com frequência.',
    'Inseguro(a), sinto que não tive o preparo necessário.',
];

export const buscaInformacaoOptions = [
    'Ligo para o médico ou para o hospital.',
    'Pesquiso no Google ou em sites.',
    'Pergunto em grupos de WhatsApp ou redes sociais de outros pais/cuidadores.',
    'Consulto materiais impressos que recebi no hospital.',
    'Não sei onde procurar ou tenho dificuldade de encontrar.',
];

export const momentoUsoAppOptions = [
    'Em uma emergência, para saber o que fazer rapidamente.',
    'No dia a dia, para organizar a rotina e registrar informações.',
    'Apenas quando surgisse uma dúvida específica.',
    'Antes de uma consulta médica, para me preparar.',
];

export const importanciaAppOptions = [
    'Ser muito fácil e rápido de usar.',
    'Ter informações 100% confiáveis, validadas por médicos.',
    'Funcionar mesmo sem internet.',
    'Ter muitas funcionalidades diferentes.',
];

export const maiorBeneficioOptions = [
    'Mais segurança e confiança nos cuidados.',
    'Mais organização e economia de tempo.',
    'Menos sentimento de solidão.',
    'Acesso mais fácil a informações corretas.',
];

export const filhoIntubadoOptions = [
  'Sim, mais de uma vez',
  'Sim, apenas uma vez',
  'Não, nunca precisou',
  'Não tenho certeza',
];

export const sabiaRiscosIntubacaoOptions = [
    'Sim, fui bem orientado(a)',
    'Ouvi falar, mas não entendi direito',
    'Não sabia dos riscos',
    'Só descobri depois que aconteceu',
];

export const explicaramRiscosTQTOptions = [
    'Sim, explicaram com detalhes',
    'Sim, mas de forma muito rápida',
    'Não explicaram nada',
    'Não me lembro / não tenho certeza',
];

export const medoIntubacaoOptions = [
    'Que meu filho não sobrevivesse',
    'Que meu filho ficasse com sequelas permanentes',
    'Que meu filho não conseguisse respirar sem ajuda de aparelhos',
    'Fiquei em choque, não consegui pensar em nada na hora',
];

export const importanciaVozFamiliasOptions = [
    'Sim, com certeza',
    'Acho importante, mas não sei se funciona na prática',
    'Nunca pensei nisso',
    'Não acho que faria diferença',
];

export const pensouComprarDispositivoOptions = [
  'Sim, várias vezes',
  'Sim, apenas uma vez',
  'Não, nunca precisei',
  'Não sabia que era possível comprar por conta própria',
];

export const dificuldadeCompraOptions = [
    'Não sabia como procurar (especificações técnicas difíceis)',
    'Não encontrei um lugar confiável para comprar',
    'Tive medo de comprar o produto errado',
    'O preço era muito alto',
];

export const utilidadeOutrasCondicoesOptions = [
  'Sim, com certeza seria muito útil.',
  'Talvez, dependendo da condição.',
  'Não, acho que não seria necessário.',
];

export const apoioComunidadeOptions = [
    'Muito interessado(a), seria uma grande ajuda',
    'Interessado(a), mas gostaria de saber mais detalhes',
    'Pouco interessado(a), prefiro outras formas de apoio',
    'Não interessado(a), prefiro lidar sozinho(a)',
];


export const funcionalidadesOptions = [
  {
    id: 'guia_emergencia',
    label: 'Guia de emergência',
    description: 'Passo a passo para obstrução, sangramento ou saída da cânula.'
  },
  {
    id: 'videos_curtos',
    label: 'Vídeos curtos',
    description: 'Mostrando como fazer a troca de cânula, aspiração e limpeza.'
  },
  {
    id: 'ia_sintomas',
    label: 'Assistente Inteligente (IA)',
    description: 'Ajuda a identificar um problema com base nos sintomas descritos.'
  },
  {
    id: 'diario_eventos',
    label: 'Diário de eventos',
    description: 'Para registrar e criar um histórico fácil de compartilhar com médicos.'
  },
  {
    id: 'comunidade_segura',
    label: 'Comunidade segura',
    description: 'Para conversar e trocar experiências com outras famílias.'
  },
];

export const avaliacaoOptions = ['Inútil', 'Pouco Útil', 'Útil', 'Muito Útil', 'Essencial'];

