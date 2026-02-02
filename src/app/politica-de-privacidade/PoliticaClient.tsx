"use client";

import styles from "./Politica.module.css";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Home, FileText } from "lucide-react";

export default function PoliticaDePrivacidadeClient() {
  const [activeSection, setActiveSection] = useState<string>("");

  const sections = [
    { id: "controlador", title: "1. Controlador dos Dados Pessoais" },
    { id: "dados-coletados", title: "2. Dados Pessoais Coletados" },
    { id: "consentimento", title: "3. Consentimento para Dados de Crianças" },
    { id: "finalidade", title: "4. Finalidade do Tratamento" },
    { id: "compartilhamento", title: "5. Compartilhamento de Dados" },
    { id: "retencao", title: "6. Retenção e Descarte" },
    { id: "seguranca", title: "7. Segurança dos Dados" },
    { id: "direitos", title: "8. Direitos dos Titulares" },
    { id: "cookies", title: "9. Cookies e Tecnologias" },
    { id: "transferencia", title: "10. Transferência Internacional" },
    { id: "dpo", title: "11. Encarregado de Dados (DPO)" },
    { id: "alteracoes", title: "12. Alterações nesta Política" },
    { id: "legislacao", title: "13. Legislação Aplicável" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>
              <Home size={16} />
              Início
            </Link>
            <ChevronRight size={16} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbCurrent}>
              <FileText size={16} />
              Política de Privacidade
            </span>
          </div>

          <h1 className={styles.mainTitle}>Política de Privacidade</h1>

          <div className={styles.metadata}>
            <span className={styles.version}>Versão 1.0</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>Última atualização: 30 de janeiro de 2026</span>
          </div>

          <p className={styles.intro}>
            Sua privacidade e a proteção dos dados pessoais da criança sob sua responsabilidade
            são prioridades absolutas para o <strong>VapApp - Via Aérea Pediátrica</strong>.
            Esta Política de Privacidade descreve como coletamos, usamos, armazenamos,
            compartilhamos e protegemos suas informações pessoais e os dados de saúde da
            Criança Traqueostomizada ao utilizar nosso Aplicativo, em conformidade com a
            <strong> Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>,
            o <strong>Marco Civil da Internet (Lei nº 12.965/2014)</strong> e o
            <strong> Estatuto da Criança e do Adolescente (ECA - Lei nº 8.069/1990)</strong>.
          </p>

          <div className={styles.consentBox}>
            <p>
              Ao aceitar os Termos de Uso e utilizar o VapApp - Via Aérea Pediátrica,
              você concorda com as práticas de tratamento de dados descritas nesta
              Política de Privacidade.
            </p>
          </div>
        </div>

        {/* Index Navigation */}
        <nav className={styles.indexCard}>
          <h2 className={styles.indexTitle}>Índice</h2>
          <ul className={styles.indexList}>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className={`${styles.indexLink} ${
                    activeSection === section.id ? styles.indexLinkActive : ""
                  }`}
                >
                  <ChevronRight size={16} />
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Card */}
        <div className={styles.card}>
          {/* Section 1 */}
          <section id="controlador" className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Controlador dos Dados Pessoais</h2>
            <p>
              O Controlador dos dados pessoais coletados e tratados por meio do
              VapApp - Via Aérea Pediátrica é:
            </p>
            <div className={styles.highlightBox}>
              <p><strong>INNOVA DIGITAL LTDA.</strong></p>
              <p><strong>CNPJ:</strong> 61.674.924/0001-68</p>
              <p>
                <strong>Endereço:</strong> Av. Fernandes Lima, nº 08, Edf. Centenário Plaza Center,
                Sala 406, Farol, Maceió/AL, CEP: 57.050-000
              </p>
              <p><strong>Contato:</strong> comunicacao@vap-app.com.br</p>
            </div>
            <p>
              Como Controlador, somos responsáveis por todas as decisões referentes
              ao Tratamento de Dados Pessoais.
            </p>
          </section>

          {/* Section 2 */}
          <section id="dados-coletados" className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Dados Pessoais Coletados e Como São Obtidos</h2>
            <p>
              Para oferecer as funcionalidades do VapApp - Via Aérea Pediátrica, coletamos
              diferentes categorias de Dados Pessoais. A coleta ocorre de diversas formas,
              sempre com a finalidade de fornecer, melhorar e personalizar a experiência do
              usuário e contribuir para os objetivos de saúde pública, em estrita observância
              ao princípio da minimização de dados (Art. 6º, III, da LGPD), coletando apenas
              o estritamente necessário para cada finalidade.
            </p>

            <h3 className={styles.subsectionTitle}>2.1. Dados Pessoais do Cuidador/Pais e Responsáveis Legais:</h3>
            <ul className={styles.list}>
              <li><strong>Nome Completo:</strong> Obtido no momento do cadastro inicial.</li>
              <li><strong>CPF:</strong> Obtido no momento do cadastro inicial para sua identificação única e validação da capacidade legal.</li>
              <li><strong>Endereço de E-mail:</strong> Obtido no momento do cadastro, utilizado para comunicação, recuperação de acesso e notificações.</li>
              <li><strong>Número de Telefone:</strong> Obtido no momento do cadastro, utilizado para comunicação e notificações (via SMS ou aplicativos de mensagens).</li>
              <li>
                <strong>Dados Sociais:</strong> Informações como nível de escolaridade, renda familiar
                ou outras características socioeconômicas, se coletadas, serão obtidas por preenchimento
                voluntário do Usuário, com a finalidade de compreender o contexto sociofamiliar e as
                necessidades de suporte, visando exclusivamente à melhoria do Aplicativo e de seus
                conteúdos, sempre por meio de análises agregadas e anonimizadas que não permitam a
                identificação individual. Em caso de estudos de pesquisa, serão sempre priorizadas a
                agregação e anonimização, em conformidade com o Art. 7º, IV da LGPD.
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.2. Dados Pessoais da Criança Traqueostomizada:</h3>
            <ul className={styles.list}>
              <li><strong>Nome Completo:</strong> Inserido pelo Cuidador/Responsável Legal no perfil da criança.</li>
              <li><strong>Data de Nascimento:</strong> Inserida pelo Cuidador/Responsável Legal para cálculo da idade e acompanhamento do desenvolvimento.</li>
              <li><strong>Sexo:</strong> Inserido pelo Cuidador/Responsável Legal.</li>
              <li><strong>Filiação:</strong> Inserida pelo Cuidador/Responsável Legal.</li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.3. Dados Clínicos da Criança (Dados Pessoais Sensíveis):</h3>
            <ul className={styles.list}>
              <li><strong>Histórico de Traqueostomia:</strong> Data da traqueostomia, indicação, intercorrências cirúrgicas, inseridos pelo Cuidador/Responsável Legal.</li>
              <li><strong>Condições Médicas Associadas:</strong> Outras patologias, comorbidades, alergias, inseridos pelo Cuidador/Responsável Legal.</li>
              <li><strong>Tipos de Cânulas e Dispositivos:</strong> Informações detalhadas sobre os dispositivos utilizados (tipo, marca, modelo, tamanho, datas de troca, intercorrências com o dispositivo), inseridas pelo Cuidador/Responsável Legal.</li>
              <li><strong>Acompanhamento Médico e Terapêutico:</strong> Informações sobre consultas, profissionais de saúde envolvidos, terapias (fisioterapia, fonoaudiologia, etc.), inseridas pelo Cuidador/Responsável Legal.</li>
              <li><strong>Medicações e Posologia:</strong> Medicamentos em uso, dosagens, horários, inseridos pelo Cuidador/Responsável Legal.</li>
              <li><strong>Exames e Resultados:</strong> Possibilidade de anexar ou registrar dados de exames laboratoriais e de imagem, inseridos pelo Cuidador/Responsável Legal.</li>
              <li><strong>Dados Biomédicos:</strong> Peso, altura, temperatura, frequência respiratória, entre outros indicadores vitais, inseridos pelo Cuidador/Responsável Legal para acompanhamento.</li>
              <li><strong>Registro de Intercorrências:</strong> Anotações sobre episódios de dessaturação de oxigênio, obstrução da cânula, infecções, ou outras situações clínicas relevantes, inseridas pelo Cuidador/Responsável Legal.</li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.4. Dados de Geolocalização:</h3>
            <ul className={styles.list}>
              <li>
                <strong>Localização do Dispositivo:</strong> Coletada (se o Usuário conceder a permissão)
                por meio do GPS ou da rede do seu dispositivo móvel, com a finalidade de auxiliar na
                localização de serviços de apoio médico e assistencial especializados próximos à sua
                região. Esta coleta é pontual e ocorre apenas para fornecer o serviço solicitado
                (ex: &ldquo;encontrar hospital próximo&rdquo;). Salvo sua autorização específica para fins de
                políticas públicas (sempre que possível, anonimizada), não será armazenado de forma
                contínua ou persistente que permita o rastreamento da sua rotina.
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.5. Dados de Utilização e Dispositivo:</h3>
            <ul className={styles.list}>
              <li>
                <strong>Informações Técnicas do Dispositivo:</strong> Modelo do hardware, sistema
                operacional, versão do aplicativo, identificadores únicos do dispositivo, informações
                da rede móvel, tipo de navegador. Coletados automaticamente para garantir a
                compatibilidade, desempenho e segurança do Aplicativo.
              </li>
              <li>
                <strong>Dados de Uso do Aplicativo:</strong> Interações com as funcionalidades, tempo
                de uso, recursos acessados, logs de atividades. Coletados automaticamente para fins de
                melhoria contínua do serviço, análise de erros e otimização da experiência do usuário.
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.6. Dados de Interação com o Chatbot de IA:</h3>
            <ul className={styles.list}>
              <li>
                <strong>Conteúdo das Conversas:</strong> As perguntas feitas ao chatbot e as respostas
                fornecidas por ele, limitadas a 20 frases por interação, são coletadas para fins de
                aprimoramento do modelo de IA, garantia da segurança do sistema, conformidade com estes
                Termos e aprimoramento da qualidade do serviço.
              </li>
              <li>
                <strong>Metadados da Interação:</strong> Data, hora e duração da interação, bem como
                o identificador do usuário.
              </li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.7. Dados de Transação no Marketplace:</h3>
            <ul className={styles.list}>
              <li><strong>Informações do Vendedor:</strong> Dados de contato, informações bancárias ou de pagamento (se aplicável para recebimento de vendas), dados de registro comercial (se pessoa jurídica), histórico de vendas.</li>
              <li><strong>Informações do Comprador:</strong> Dados de contato, endereço de entrega, histórico de compras, informações de pagamento (se aplicável para processamento).</li>
              <li><strong>Dados da Transação:</strong> Detalhes dos produtos/serviços adquiridos, valor da transação, data, status da entrega, avaliações e comentários sobre produtos/serviços.</li>
              <li><strong>Dados de Interação:</strong> Mensagens trocadas entre comprador e vendedor dentro da plataforma do Marketplace.</li>
            </ul>

            <h3 className={styles.subsectionTitle}>2.8. Dados de Interação no Chat Comunitário:</h3>
            <ul className={styles.list}>
              <li><strong>Conteúdo das Mensagens:</strong> Mensagens de texto, imagens, vídeos ou outros arquivos compartilhados no chat comunitário.</li>
              <li><strong>Metadados:</strong> Data, hora, autor da mensagem, identificadores do grupo/tópico de chat.</li>
              <li><strong>Dados de Moderação:</strong> Registros de ações de moderação (remoção de conteúdo, suspensão de usuário).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section id="consentimento" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              3. Consentimento Específico para Dados de Crianças e o Melhor Interesse da Criança
            </h2>

            <p>
              <strong>3.1.</strong> O tratamento de Dados Pessoais da Criança Traqueostomizada,
              e especialmente de seus Dados Clínicos (que são Dados Pessoais Sensíveis), será
              sempre realizado no Melhor Interesse da Criança, conforme exigido pelo Art. 14
              da LGPD e pelo ECA.
            </p>

            <p>
              <strong>3.2.</strong> Para qualquer coleta e tratamento de Dados Pessoais da Criança,
              incluindo seus Dados Clínicos, é IMPRESCINDÍVEL o consentimento ESPECÍFICO E EM
              DESTAQUE de pelo menos um dos Pais ou do Responsável Legal. Este consentimento
              será obtido por meio de um processo claro, granular e inequívoco dentro do Aplicativo,
              onde serão detalhadas as finalidades do tratamento e a possibilidade de revogação.
            </p>

            <div className={styles.warningBox}>
              <h4>3.3. Mecanismos de Consentimento:</h4>
              <p>
                Ao se cadastrar e criar o perfil da Criança Traqueostomizada no Aplicativo,
                você será solicitado a dar seu consentimento de forma granular e transparente para:
              </p>
              <ol type="a" className={styles.alphaList}>
                <li>
                  A coleta e o armazenamento dos Dados Pessoais da Criança para a criação do
                  seu perfil de saúde e utilização das funcionalidades de registro e acompanhamento.
                </li>
                <li>
                  A coleta e o armazenamento dos Dados Clínicos da Criança (Dados Pessoais Sensíveis)
                  para as finalidades de registro, acompanhamento e, quando aplicável, para o Registro
                  Nacional da Criança Traqueostomizada, conforme detalhado nesta Política.
                </li>
                <li>
                  Outras finalidades específicas que possam surgir e que demandem consentimento.
                </li>
              </ol>
            </div>

            <p>
              <strong>3.4.</strong> Você tem o direito de revogar este consentimento a qualquer
              momento, de forma facilitada, através das configurações do Aplicativo ou entrando
              em contato com nosso Encarregado de Dados (DPO). A revogação do consentimento para
              o tratamento dos Dados da Criança ou de seus Dados Clínicos poderá, contudo,
              inviabilizar a utilização de certas funcionalidades do Aplicativo que dependem
              diretamente dessas informações.
            </p>
          </section>

          {/* Section 4 */}
          <section id="finalidade" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              4. Finalidade do Tratamento dos Dados Pessoais e Bases Legais
            </h2>

            <p>
              O Tratamento dos Dados Pessoais, incluindo os Dados Pessoais Sensíveis da Criança
              Traqueostomizada, é realizado para as seguintes finalidades, sempre amparado por
              uma base legal clara da LGPD:
            </p>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Categoria de Dados Tratados</th>
                    <th>Finalidade do Tratamento</th>
                    <th>Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Dados Pessoais do Cuidador/Pais e Responsáveis Legais</strong></td>
                    <td>
                      Autenticação e identificação do Usuário; Comunicação sobre o uso do Aplicativo,
                      atualizações, novas funcionalidades; Suporte ao Usuário e atendimento de solicitações.
                    </td>
                    <td>Art. 7º, I (Consentimento); Art. 7º, V (Execução de contrato ou procedimentos preliminares).</td>
                  </tr>
                  <tr>
                    <td><strong>Informações Socioeconômicas e Geográficas</strong></td>
                    <td>
                      Compreensão do contexto sociofamiliar para estudos de perfil e necessidades de
                      suporte (Dados Sociais), visando exclusivamente à melhoria do Aplicativo e de seus
                      conteúdos, sempre por meio de análises agregadas e anonimizadas.
                    </td>
                    <td>
                      Art. 7º, IX (Legítimo Interesse, após Avaliação de Legítimo Interesse – LIA, para
                      finalidades não discriminatórias); Art. 7º, IV (Realização de estudos por órgão de
                      pesquisa, quando anonimizados).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados Pessoais da Criança Traqueostomizada</strong></td>
                    <td>
                      Criação e manutenção do perfil de saúde da Criança; Identificação da Criança para
                      o registro e acompanhamento de seu desenvolvimento e condição; Personalização da
                      experiência de uso do Aplicativo.
                    </td>
                    <td>
                      Art. 14, §1º (Consentimento dos pais/responsáveis); Art. 7º, V (Execução de contrato,
                      para viabilizar as funcionalidades do Aplicativo).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados Clínicos da Criança (Dados Pessoais Sensíveis)</strong></td>
                    <td>
                      Registro do histórico de saúde e condições clínicas para acompanhamento do
                      Cuidador/Responsável Legal; Organização de informações para facilitar o manejo
                      diário e a comunicação com profissionais de saúde; Apoio à educação e instrução
                      familiar sobre os cuidados específicos; Criação e manutenção do Registro Nacional
                      da Criança Traqueostomizada para fins de pesquisa em saúde pública, formulação de
                      políticas públicas e estudos epidemiológicos (prioritariamente de forma anonimizada).
                    </td>
                    <td>
                      Art. 14, §1º (Consentimento específico dos pais/responsáveis); Art. 11, II, &ldquo;d&rdquo;
                      (Realização de estudos por órgão de pesquisa, garantindo a anonimização dos dados
                      sensíveis sempre que possível, e com aprovação do Comitê de Ética em Pesquisa, quando
                      cabível); Art. 11, II, &ldquo;g&rdquo; (Proteção da vida ou incolumidade física do titular ou de
                      terceiro, em situações de emergência); Art. 11, II, &ldquo;b&rdquo; ou &ldquo;c&rdquo; (Execução de políticas
                      públicas ou tutela da saúde por autoridade sanitária/serviços de saúde, se houver
                      convênio/instrumento congênere com órgão público).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados de Geolocalização</strong></td>
                    <td>
                      Auxiliar na busca e identificação de serviços de saúde, estabelecimentos especializados
                      ou grupos de apoio próximos ao Usuário; Análise estatística de distribuição geográfica
                      de casos para o Registro Nacional (anonimizada).
                    </td>
                    <td>
                      Art. 7º, I (Consentimento, para serviços específicos solicitados); Art. 7º, IV
                      (Realização de estudos por órgão de pesquisa, quando anonimizados); Art. 7º, IX
                      (Legítimo Interesse, para melhoria do serviço e segurança, em dados agregados e
                      anonimizados, após LIA).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados de Utilização e Dispositivo</strong></td>
                    <td>
                      Otimização do desempenho e da compatibilidade do Aplicativo; Detecção e correção de
                      falhas e bugs; Análise de padrões de uso para aprimoramento das funcionalidades e
                      experiência do usuário; Garantia da segurança da informação e prevenção de fraudes.
                    </td>
                    <td>
                      Art. 7º, IX (Legítimo Interesse, para melhoria do serviço e segurança); Art. 7º, V
                      (Execução de contrato, para viabilizar a prestação do serviço).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados de Interação com o Chatbot de IA</strong></td>
                    <td>
                      Aprimoramento contínuo do algoritmo do Chatbot, para oferecer respostas mais precisas
                      e úteis; Monitoramento da qualidade e segurança do serviço; Análise de padrões de
                      dúvidas para desenvolvimento de conteúdos educativos; Prevenção de uso abusivo ou
                      inadequado.
                    </td>
                    <td>
                      Art. 7º, IX (Legítimo Interesse, para melhoria do serviço e segurança); Art. 7º, I
                      (Consentimento, quando houver menção explícita de dados pessoais sensíveis do titular
                      ou de terceiros).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados de Transação no Marketplace</strong></td>
                    <td>
                      Facilitar a conexão entre compradores e vendedores; Processar e gerenciar transações;
                      Fornecer suporte ao cliente e resolver disputas; Melhorar a experiência no Marketplace
                      e personalizar ofertas; Prevenir fraudes e garantir a segurança das transações; Cumprir
                      obrigações fiscais e regulatórias.
                    </td>
                    <td>
                      Art. 7º, V (Execução de contrato, para processar transações); Art. 7º, IX (Legítimo
                      Interesse, para prevenção de fraudes e melhoria do serviço); Art. 7º, II (Cumprimento
                      de obrigação legal).
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Dados de Interação no Chat Comunitário</strong></td>
                    <td>
                      Facilitar a comunicação e interação entre os Usuários; Fornecer um ambiente de apoio
                      e troca de informações; Realizar a moderação de conteúdo para manter um ambiente seguro
                      e respeitoso; Prevenir o compartilhamento de desinformação, conteúdo ilegal ou
                      prejudicial; Melhorar a experiência do usuário no chat.
                    </td>
                    <td>
                      Art. 7º, V (Execução de contrato, para fornecer o serviço de chat); Art. 7º, IX
                      (Legítimo Interesse, para moderação, segurança e melhoria do serviço). Art. 7º, I
                      (Consentimento, para o compartilhamento público de dados do titular, quando aplicável).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5 */}
          <section id="compartilhamento" className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Compartilhamento de Dados Pessoais</h2>

            <p>
              <strong>5.1.</strong> Os Dados Pessoais e Dados Pessoais Sensíveis coletados pelo
              VapApp são tratados com o mais alto nível de confidencialidade e segurança. O
              compartilhamento dessas informações ocorre apenas nas situações estritamente
              necessárias e para as finalidades específicas descritas nesta Política de Privacidade,
              sempre em conformidade com a LGPD e demais legislações aplicáveis.
            </p>

            <p>
              <strong>5.2. Compartilhamento com Operadores e Provedores de Serviço:</strong>
              Podemos compartilhar seus Dados Pessoais e os Dados Pessoais da Criança Traqueostomizada
              com terceiros que atuam como nossos operadores ou provedores de serviço (ex: serviços de
              hospedagem de dados, plataformas de e-mail, ferramentas de análise de uso do aplicativo,
              empresas de segurança da informação, provedores de tecnologia de inteligência artificial
              para o funcionamento do Chatbot e Gateways de Pagamento). Esses parceiros agem
              exclusivamente em nosso nome e sob nossas instruções, estando contratualmente vinculados
              a obrigações de segurança, confidencialidade e proteção de dados rigorosas, não podendo
              utilizar as informações para outras finalidades.
            </p>

            <div className={styles.highlightBox}>
              <h4>5.3. Compartilhamento para o Registro Nacional da Criança Traqueostomizada e Fins de Pesquisa:</h4>
              <ol type="a" className={styles.alphaList}>
                <li>
                  Com o seu consentimento explícito, e no melhor interesse da Criança Traqueostomizada
                  e da saúde pública, os Dados Pessoais e Dados Clínicos da Criança serão utilizados
                  para compor o Registro Nacional da Criança Traqueostomizada.
                </li>
                <li>
                  Para fins de pesquisa epidemiológica, formulação e aprimoramento de políticas públicas
                  de saúde, e estudos científicos, os dados compartilhados com órgãos de pesquisa,
                  instituições de ensino e autoridades sanitárias serão, sempre que possível,
                  <strong> ANONIMIZADOS OU AGREGADOS</strong> de forma a impossibilitar a identificação
                  direta ou indireta da Criança ou do Cuidador/Responsável Legal (em conformidade com o
                  Art. 13 da LGPD, que regula o tratamento de dados pessoais para fins de pesquisa em
                  saúde). A anonimização visa preservar ao máximo a privacidade dos titulares, enquanto
                  permite que a pesquisa avance em benefício da comunidade.
                </li>
                <li>
                  Caso haja a necessidade, em caráter excepcional e devidamente justificado, de
                  compartilhamento de dados identificáveis para estas finalidades (ex: para acompanhamento
                  longitudinal específico de um projeto de pesquisa), este ocorrerá mediante (i) base
                  legal robusta prevista no Art. 11, II da LGPD (ex: tutela da saúde por autoridade
                  sanitária, execução de políticas públicas ou estudos por órgão de pesquisa, se devidamente
                  justificado), (ii) aprovação prévia por um Comitê de Ética em Pesquisa (CEP) ou instância
                  regulatória competente, e (iii) consentimento adicional e específico dos Cuidadores/Pais
                  e Responsáveis Legais, quando exigido pelo Comitê de Ética ou pela legislação específica,
                  sempre priorizando o melhor interesse da Criança e a segurança das informações.
                </li>
              </ol>
            </div>

            <p>
              <strong>5.4. Compartilhamento com Autoridades Legais e Governamentais:</strong>
              Podemos compartilhar seus Dados Pessoais e os Dados Pessoais da Criança Traqueostomizada
              em resposta a ordens judiciais, solicitações de autoridades competentes (incluindo
              Autoridade Nacional de Proteção de Dados - ANPD, órgãos de fiscalização), ou para cumprir
              com obrigações legais ou regulatórias. Nestes casos, o compartilhamento será limitado ao
              estritamente necessário para atender à determinação legal ou regulatória (Art. 7º, II e
              Art. 11, II, &ldquo;a&rdquo; da LGPD). Salvo quando proibido por lei ou segredo de justiça, o Usuário
              será notificado sobre a requisição.
            </p>

            <p>
              <strong>5.5. Compartilhamento no Marketplace:</strong> Ao utilizar o Marketplace, você
              concorda que seus Dados Pessoais e os Dados Pessoais da Criança Traqueostomizada (conforme
              necessário para a transação, como nome do comprador/vendedor, endereço de entrega/retirada,
              ou informações relevantes para o produto/serviço) serão compartilhados entre os Usuários
              Vendedores e Usuários Compradores envolvidos em uma transação, exclusivamente para fins de
              conclusão e gerenciamento da compra e venda. Podemos também compartilhar informações com
              provedores de serviços de pagamento e logística, conforme necessário para a transação.
            </p>

            <p>
              <strong>5.6. Compartilhamento no Chat Comunitário:</strong> As mensagens e conteúdos que
              você publica no Chat Comunitário são visíveis para outros Usuários que participam do chat.
              Ao utilizar esta funcionalidade, você entende e concorda que as informações que compartilha
              se tornam públicas ou semi-públicas dentro do grupo, e que outros Usuários podem ter acesso
              a elas. Recomendamos total cautela ao compartilhar dados pessoais sensíveis (seus ou da
              Criança Traqueostomizada) neste ambiente.
            </p>

            <p>
              <strong>5.7. Outros Casos:</strong> O compartilhamento de dados também pode ocorrer para:
            </p>
            <ol type="a" className={styles.alphaList}>
              <li>
                Proteger nossos direitos, propriedade ou segurança, bem como a de nossos usuários ou do
                público, conforme permitido por lei;
              </li>
              <li>
                Em caso de reorganização societária, fusão, aquisição, venda de ativos ou transição de
                serviço, seus dados podem ser transferidos para a nova entidade, com a garantia de que
                esta cumprirá com as disposições desta Política de Privacidade.
              </li>
            </ol>
          </section>

          {/* Section 6 */}
          <section id="retencao" className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Retenção e Descarte de Dados Pessoais</h2>

            <p>
              <strong>6.1.</strong> Seus Dados Pessoais e os Dados Pessoais da Criança
              Traqueostomizada serão retidos por nós apenas pelo tempo necessário para cumprir as
              finalidades para as quais foram coletados, para o cumprimento de obrigações legais ou
              regulatórias, para o exercício regular de direitos em processos judiciais,
              administrativos ou arbitrais, ou para estudos por órgãos de pesquisa (quando
              anonimizados), conforme o Art. 15 da LGPD.
            </p>

            <p>
              <strong>6.2.</strong> Após o término do período de retenção ou da finalidade do
              tratamento, os dados serão eliminados ou anonimizados, a menos que a sua manutenção
              seja obrigatória por lei.
            </p>
          </section>

          {/* Section 7 */}
          <section id="seguranca" className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Segurança dos Dados Pessoais</h2>

            <p>
              <strong>7.1.</strong> Adotamos medidas técnicas e organizacionais de segurança da
              informação adequadas para proteger seus Dados Pessoais e os Dados Pessoais da Criança
              Traqueostomizada contra acessos não autorizados, situações acidentais ou ilícitas de
              destruição, perda, alteração, comunicação ou difusão. Nossas medidas incluem:
            </p>

            <div className={styles.securityGrid}>
              <div className={styles.securityItem}>
                <h4>Criptografia</h4>
                <p>
                  Utilização de tecnologias de criptografia para proteger a transmissão e o
                  armazenamento dos dados, garantindo que a comunicação entre seu dispositivo e
                  nossos servidores seja segura e confidencial.
                </p>
              </div>
              <div className={styles.securityItem}>
                <h4>Controle de Acesso</h4>
                <p>
                  Implementação de rigorosos controles de acesso aos dados, limitando o acesso
                  apenas a pessoal autorizado que necessite da informação para desempenhar suas
                  funções e que esteja sujeito a obrigações de confidencialidade.
                </p>
              </div>
              <div className={styles.securityItem}>
                <h4>Monitoramento e Testes</h4>
                <p>
                  Monitoramento contínuo de nossos sistemas para identificar e prevenir
                  vulnerabilidades, realizando testes de segurança periódicos para assegurar a
                  integridade e resiliência de nossos sistemas.
                </p>
              </div>
              <div className={styles.securityItem}>
                <h4>Backup e Recuperação</h4>
                <p>
                  Procedimentos de backup e recuperação de dados para prevenir perdas e garantir
                  a disponibilidade das informações.
                </p>
              </div>
            </div>

            <div className={styles.warningBox}>
              <p>
                <strong>7.2.</strong> Apesar de nossos esforços, nenhuma transmissão de dados pela
                Internet ou sistema de armazenamento eletrônico pode ser 100% segura. Portanto, não
                podemos garantir a segurança absoluta dos dados. O Usuário também tem um papel
                fundamental na segurança, devendo proteger suas credenciais de acesso e reportar
                imediatamente qualquer atividade suspeita.
              </p>
            </div>

            <p>
              <strong>7.3.</strong> Em caso de ocorrência de incidente de segurança que possa
              acarretar risco ou dano relevante aos seus direitos e liberdades pessoais, ou aos da
              Criança Traqueostomizada, nós o comunicaremos em prazo adequado, conforme o Art. 48
              da LGPD.
            </p>
          </section>

          {/* Section 8 */}
          <section id="direitos" className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Direitos dos Titulares dos Dados Pessoais</h2>

            <p>
              Você, como titular dos dados (e como responsável pela Criança Traqueostomizada, no
              melhor interesse dela), possui os seguintes direitos garantidos pela LGPD, que podem
              ser exercidos a qualquer momento, mediante solicitação:
            </p>

            <div className={styles.rightsGrid}>
              <div className={styles.rightItem}>
                <h4>Direito de Confirmação e Acesso (Art. 18, I e II)</h4>
                <p>
                  Obter a confirmação de que seus dados estão sendo tratados e, em caso afirmativo,
                  ter acesso a eles.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito de Retificação (Art. 18, III)</h4>
                <p>
                  Solicitar a correção de dados incompletos, inexatos ou desatualizados.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito à Anonimização, Bloqueio ou Eliminação (Art. 18, IV)</h4>
                <p>
                  Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários,
                  excessivos ou tratados em desconformidade com a LGPD.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito à Portabilidade (Art. 18, V)</h4>
                <p>
                  Receber seus dados em formato estruturado e interoperável, para transferência
                  a outro fornecedor de serviço ou produto.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito à Eliminação (Art. 18, VI)</h4>
                <p>
                  Solicitar a eliminação dos dados tratados com base no seu consentimento, exceto
                  nas hipóteses previstas no Art. 16 da LGPD.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito à Informação sobre o Compartilhamento (Art. 18, VII)</h4>
                <p>
                  Obter informações sobre as entidades públicas e privadas com as quais o
                  Controlador realizou uso compartilhado de dados.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito à Informação sobre a Possibilidade de Não Fornecer Consentimento (Art. 18, VIII)</h4>
                <p>
                  Ser informado sobre as consequências da recusa em fornecer consentimento e sobre
                  as opções para as finalidades de tratamento que podem ser recusadas.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito de Revogação do Consentimento (Art. 18, § 5º)</h4>
                <p>
                  Revogar o consentimento a qualquer momento, o que não afetará a legalidade do
                  tratamento realizado antes da revogação.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito de Oposição (Art. 18, § 2º)</h4>
                <p>
                  Opor-se ao tratamento de dados pessoais em caso de descumprimento à LGPD.
                </p>
              </div>
              <div className={styles.rightItem}>
                <h4>Direito de Revisão de Decisões Automatizadas (Art. 20)</h4>
                <p>
                  Solicitar a revisão de decisões tomadas unicamente com base em tratamento
                  automatizado de dados pessoais que afetem seus interesses.
                </p>
              </div>
            </div>

            <div className={styles.highlightBox}>
              <p>
                Para exercer qualquer um desses direitos, você pode entrar em contato com nosso
                Encarregado de Dados (DPO) pelos canais indicados nesta Política de Privacidade.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="cookies" className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Cookies e Tecnologias Semelhantes</h2>

            <p>
              <strong>9.1.</strong> O VapApp - Via Aérea Pediátrica pode utilizar cookies e outras
              tecnologias de rastreamento para melhorar a sua experiência de navegação, otimizar o
              desempenho e analisar o uso do Aplicativo. Cookies são pequenos arquivos de texto
              armazenados no seu dispositivo.
            </p>

            <p>
              <strong>9.2.</strong> Utilizamos cookies de sessão (temporários, removidos ao fechar
              o aplicativo) e persistentes (permanecem no seu dispositivo até expirar ou serem
              excluídos). Os cookies podem ser:
            </p>

            <ul className={styles.list}>
              <li>
                <strong>Necessários:</strong> Essenciais para o funcionamento básico do Aplicativo
                e para fornecer as funcionalidades solicitadas. Não podem ser desabilitados em
                nossos sistemas.
              </li>
              <li>
                <strong>De Desempenho/Análise:</strong> Permitem-nos entender como os usuários
                interagem com o Aplicativo, identificando áreas de melhoria e otimizando a
                experiência (ex: _ga, _gid do Google Analytics, com dados anonimizados sempre que
                possível). Estes cookies são opcionais e dependem da sua permissão.
              </li>
              <li>
                <strong>De Preferência/Funcionalidade:</strong> Permitem que o Aplicativo lembre
                suas escolhas para proporcionar uma experiência mais personalizada.
              </li>
            </ul>

            <p>
              <strong>9.3.</strong> Você pode gerenciar suas preferências de cookies nas configurações
              do seu dispositivo ou do próprio Aplicativo, quando disponível. A desativação de certos
              cookies pode, contudo, afetar a funcionalidade completa do Aplicativo.
            </p>
          </section>

          {/* Section 10 */}
          <section id="transferencia" className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Transferência Internacional de Dados</h2>

            <p>
              <strong>10.1.</strong> Se houver a necessidade de transferência internacional de Dados
              Pessoais ou Dados Pessoais Sensíveis (ex: para armazenamento em servidores localizados
              em outro país), esta ocorrerá somente para países que possuam um nível de proteção de
              dados considerado adequado pela Autoridade Nacional de Proteção de Dados (ANPD) ou
              mediante a adoção de garantias e cláusulas contratuais específicas que assegurem um
              nível de proteção equivalente ao da LGPD (Art. 33 da LGPD).
            </p>

            <p>
              <strong>10.2.</strong> Priorizamos fornecedores de serviços que mantenham seus
              servidores e operações de dados no Brasil.
            </p>
          </section>

          {/* Section 11 */}
          <section id="dpo" className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Encarregado de Dados (DPO) e Canais de Contato</h2>

            <p>
              <strong>11.1.</strong> Para qualquer dúvida, reclamação, ou para exercer seus direitos
              como titular de dados, você pode entrar em contato diretamente com o nosso Encarregado
              de Dados (Data Protection Officer - DPO):
            </p>

            <div className={styles.contactBox}>
              <h4>Encarregado de Dados (DPO)</h4>
              <p><strong>Nome:</strong> Kauê Cavalcante Wanderley de Melo</p>
              <p><strong>E-mail:</strong> <a href="mailto:dpo@vap-app.com.br">dpo@vap-app.com.br</a></p>
            </div>

            <p>
              <strong>11.2.</strong> Nosso DPO estará à disposição para esclarecer qualquer questão
              relativa a esta Política de Privacidade e ao Tratamento de Dados Pessoais realizado por nós.
            </p>
          </section>

          {/* Section 12 */}
          <section id="alteracoes" className={styles.section}>
            <h2 className={styles.sectionTitle}>12. Alterações nesta Política de Privacidade</h2>

            <p>
              <strong>12.1.</strong> Esta Política de Privacidade poderá ser atualizada a qualquer
              momento para refletir mudanças em nossas práticas de tratamento de dados, novas
              tecnologias, requisitos legais ou regulatórios, ou para oferecer um serviço mais
              aprimorado.
            </p>

            <p>
              <strong>12.2.</strong> A versão mais recente da Política de Privacidade será sempre a
              disponível no Aplicativo. Em caso de alterações substanciais que afetem seus direitos
              ou a forma como seus dados são tratados, você será notificado por meio de aviso no
              Aplicativo, e-mail ou outros meios de comunicação apropriados, com antecedência razoável
              para que possa revisar as mudanças e decidir sobre a sua continuidade no uso do Aplicativo.
            </p>
          </section>

          {/* Section 13 */}
          <section id="legislacao" className={styles.section}>
            <h2 className={styles.sectionTitle}>13. Legislação Aplicável e Foro</h2>

            <p>
              <strong>13.1.</strong> Esta Política de Privacidade será regida e interpretada de
              acordo com as leis da República Federativa do Brasil, em especial a Lei nº 13.709/2018
              (Lei Geral de Proteção de Dados Pessoais - LGPD).
            </p>

            <p>
              <strong>13.2.</strong> Fica eleito o foro do domicílio do Usuário para dirimir
              quaisquer questões ou controvérsias decorrentes do presente documento, salvo disposição
              legal em contrário.
            </p>
          </section>

          {/* Footer */}
          <div className={styles.footer}>
            <div className={styles.footerDivider}></div>
            <p className={styles.footerText}>
              <strong>INNOVA DIGITAL LTDA.</strong>
              <br />
              CNPJ: 61.674.924/0001-68
              <br />
              Av. Fernandes Lima, nº 08, Edf. Centenário Plaza Center, Sala 406, Farol, Maceió/AL, CEP: 57.050-000
              <br />
              E-mail: <a href="mailto:comunicacao@vap-app.com.br">comunicacao@vap-app.com.br</a>
              <br />
              DPO: <a href="mailto:dpo@vap-app.com.br">dpo@vap-app.com.br</a>
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <Link href="/" className={styles.backToHome}>
            <Home size={18} />
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
