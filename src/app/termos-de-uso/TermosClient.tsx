"use client";

import styles from "../politica-de-privacidade/Politica.module.css";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Home, FileText } from "lucide-react";

export default function TermosDeUsoClient() {
  const [activeSection, setActiveSection] = useState<string>("");

  const sections = [
    { id: "definicoes", title: "1. Definicoes" },
    { id: "descricao", title: "2. Descricao do Servico e Suas Limitacoes Essenciais" },
    { id: "cadastramento", title: "3. Cadastramento e Acesso ao Aplicativo" },
    { id: "uso", title: "4. Uso do Aplicativo e Conduta do Usuario" },
    { id: "marketplace", title: "5. Disposicoes Especificas do Marketplace" },
    { id: "propriedade", title: "6. Propriedade Intelectual" },
    { id: "conteudo", title: "7. Conteudo Gerado pelo Usuario e Moderacao" },
    { id: "seguranca", title: "8. Seguranca da Informacao" },
    { id: "limitacao", title: "9. Limitacao de Responsabilidade" },
    { id: "vigencia", title: "10. Vigencia, Rescisao e Suspensao" },
    { id: "alteracoes", title: "11. Alteracoes nos Termos de Uso" },
    { id: "disposicoes", title: "12. Disposicoes Gerais" },
    { id: "legislacao", title: "13. Legislacao Aplicavel e Foro" },
    { id: "contato", title: "14. Canais de Contato" },
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
              Inicio
            </Link>
            <ChevronRight size={16} className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbCurrent}>
              <FileText size={16} />
              Termos de Uso
            </span>
          </div>

          <h1 className={styles.mainTitle}>Termos de Uso</h1>

          <div className={styles.metadata}>
            <span className={styles.version}>Versao 1.0</span>
            <span className={styles.separator}>•</span>
            <span className={styles.date}>Data da Ultima Atualizacao: 30 de janeiro de 2026</span>
          </div>

          <p className={styles.intro}>
            Bem-vindo ao <strong>VapApp - Via Aerea Pediatrica!</strong> Este documento contém os Termos de Uso que regem a utilização do aplicativo móvel VapApp - Via Aérea Pediátrica, desenvolvido por <strong>INNOVA DIGITAL LTDA.</strong> CNPJ: 61.674.924/0001-68. Endereço: Av. Fernandes Lima, nº 08, Edf. Centenário Plaza Center, Sala 406, Farol, Maceió/AL, CEP: 57.050-000. Contato: comunicacao@vap-app.com.br (doravante denominado &quot;Nós&quot; ou &quot;Aplicativo&quot;).
          </p>

          <p className={styles.intro}>
            Estes Termos de Uso são um contrato legalmente vinculativo entre Você, usuário do aplicativo (doravante denominado &quot;Você&quot; ou &quot;Usuário&quot;), e Nós. Eles definem as regras, condições e responsabilidades que se aplicam ao acesso e uso das funcionalidades oferecidas pelo VapApp - Via Aérea Pediátrica.
          </p>

          <div className={styles.consentBox}>
            <p>
              É fundamental que Você leia, compreenda e concorde integralmente com estes Termos de Uso antes de utilizar o Aplicativo. Ao acessar, navegar ou utilizar qualquer funcionalidade do VapApp - Via Aérea Pediátrica, Você declara ter lido, compreendido e aceitado todos os termos e condições aqui estabelecidos. Caso Você não concorde com qualquer disposição destes Termos de Uso, solicitamos que não utilize o Aplicativo.
            </p>
          </div>

          <p className={styles.intro} style={{ marginTop: "16px" }}>
            Este documento é complementado pela nossa Política de Privacidade, que detalha como seus dados pessoais e os dados pessoais de saúde da criança sob sua responsabilidade são coletados, tratados, armazenados e compartilhados.
          </p>

          <p className={styles.intro}>
            Ao realizar o cadastro e utilizar o Aplicativo, Você declara ser o(a) Cuidador(a)/Pai/Mãe/Responsável Legal da Criança Traqueostomizada. Você compreende e concorda que, ao aceitar estes Termos de Uso e a Política de Privacidade, está fornecendo, em nome e no melhor interesse da criança, o consentimento para o tratamento dos Dados Pessoais e Dados Pessoais Sensíveis da Criança Traqueostomizada, estritamente para as finalidades descritas nestes documentos e em conformidade com o Art. 14 da LGPD.
          </p>
        </div>

        {/* Index Navigation */}
        <nav className={styles.indexCard}>
          <h2 className={styles.indexTitle}>Indice</h2>
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
          <section id="definicoes" className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Definições</h2>
            <p>
              Para facilitar a compreensão destes Termos de Uso e da Política de Privacidade, os seguintes termos terão o significado a eles atribuído abaixo:
            </p>
            <ul className={styles.list}>
              <li><strong>Aplicativo:</strong> Refere-se ao aplicativo móvel VapApp - Via Aérea Pediátrica, desenvolvido e disponibilizado por Nós, por meio do qual os Usuários acessam os serviços e conteúdos.</li>
              <li><strong>Criança Traqueostomizada:</strong> Toda pessoa natural com idade inferior a 12 (doze) anos incompletos que necessita de traqueostomia e que é objeto de acompanhamento por este Aplicativo.</li>
              <li><strong>Cuidadores/Pais e Responsáveis Legais:</strong> Pessoa(s) natural(is) que exerce(m) o poder familiar ou que detém(êm) a guarda, tutela ou curatela legalmente concedida sobre a Criança Traqueostomizada, e que são os Usuários diretos do Aplicativo.</li>
              <li><strong>Chatbot de IA:</strong> Ferramenta interativa de Inteligência Artificial disponibilizada no Aplicativo para fornecer informações gerais e responder a dúvidas.</li>
              <li><strong>Chat Comunitário:</strong> Funcionalidade do Aplicativo que permite a interação e troca de mensagens entre os Usuários.</li>
              <li><strong>Dados Pessoais:</strong> Informação relacionada a pessoa natural identificada ou identificável, conforme definido pela Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 – LGPD).</li>
              <li><strong>Dados Pessoais Sensíveis:</strong> Dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural, conforme definido pela LGPD. Para os fins deste Aplicativo, os Dados Clínicos da Criança são considerados Dados Pessoais Sensíveis.</li>
              <li><strong>Dados Clínicos da Criança:</strong> Informações referentes à saúde da Criança Traqueostomizada, incluindo, mas não se limitando a: histórico de traqueostomia, condições médicas associadas, tipos de cânulas, intercorrências, dados de internação, medicações, exames, dados biométricos (ex: peso, altura) e demais informações essenciais para o acompanhamento da sua condição de saúde.</li>
              <li><strong>LGPD:</strong> Lei nº 13.709, de 14 de agosto de 2018 – Lei Geral de Proteção de Dados Pessoais.</li>
              <li><strong>Marketplace:</strong> Plataforma dentro do Aplicativo que facilita a oferta e aquisição de produtos e/ou serviços entre Usuários.</li>
              <li><strong>Melhor Interesse da Criança:</strong> Princípio fundamental que rege todas as ações e decisões relacionadas à Criança Traqueostomizada, garantindo que suas necessidades e direitos sejam priorizados, conforme estabelecido no Estatuto da Criança e do Adolescente (Lei nº 8.069/1990 – ECA) e na LGPD.</li>
              <li><strong>Política de Privacidade:</strong> Documento que acompanha e complementa estes Termos de Uso, detalhando as práticas de privacidade e proteção de Dados Pessoais e Dados Pessoais Sensíveis realizadas por Nós.</li>
              <li><strong>Registro Nacional da Criança Traqueostomizada:</strong> Banco de dados criado e mantido por Nós, por meio das informações coletadas e tratadas pelo Aplicativo. As informações destinadas à pesquisa epidemiológica e formulação de políticas públicas serão <strong>obrigatoriamente anonimizadas ou agregadas</strong> para garantir a não identificação direta ou indireta das crianças, conforme Art. 11, II, &apos;d&apos; e Art. 13 da LGPD. Caso dados pseudonimizados (que ainda permitem a reidentificação por meio de um processo) sejam utilizados para tais finalidades, isso ocorrerá <strong>apenas mediante consentimento específico, inequívoco e em destaque dos Cuidadores/Pais e Responsáveis Legais</strong>, e em conformidade com o Art. 13 da LGPD, que regula o tratamento de dados pessoais para fins de pesquisa em saúde.</li>
              <li><strong>Tratamento de Dados Pessoais:</strong> Toda operação realizada com Dados Pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração, conforme definido pela LGPD.</li>
              <li><strong>Usuário (ou &quot;Você&quot;):</strong> Refere-se exclusivamente ao(s) Cuidador(es)/Pai(s) e/ou Responsável(is) Legal(is) da Criança Traqueostomizada que utiliza(m) o Aplicativo.</li>
              <li><strong>Usuário Vendedor:</strong> Cuidador/Pai/Responsável Legal que oferece produtos e/ou serviços no Marketplace do Aplicativo.</li>
              <li><strong>Usuário Comprador:</strong> Cuidador/Pai/Responsável Legal que busca e adquire produtos e/ou serviços no Marketplace do Aplicativo.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section id="descricao" className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Descrição do Serviço e Suas Limitações Essenciais</h2>
            <p>
              <strong>2.1.</strong> O VapApp - Via Aérea Pediátrica é uma plataforma digital desenvolvida com o objetivo de oferecer suporte, educação e informações relevantes para Cuidadores/Pais e Responsáveis Legais de Crianças Traqueostomizadas. Suas funcionalidades incluem, mas não se limitam a:
            </p>
            <ol type="a" className={styles.alphaList}>
              <li>Registro e organização de Dados Clínicos da Criança, coletados estritamente para o acompanhamento e histórico, em observância ao princípio da minimização de dados (Art. 6º, III, da LGPD);</li>
              <li>Armazenamento de informações qualificadas sobre dispositivos médicos utilizados na linha de cuidado (ex: tipos de cânulas, especificações técnicas);</li>
              <li>Acesso a material didático, aulas e conteúdos educativos especializados para instrução familiar sobre os cuidados e manejo da criança traqueostomizada;</li>
              <li>Ferramentas de apoio à rotina e comunicação entre cuidadores (se aplicável);</li>
              <li>Coleta e tratamento de dados, que serão <strong>obrigatoriamente anonimizados</strong> para a formação do Registro Nacional da Criança Traqueostomizada, visando estudos estatísticos e aprimoramento de políticas públicas de saúde, conforme Art. 11, II, &apos;d&apos; e Art. 13 da LGPD. <strong>Para qualquer hipótese de tratamento de dados sensíveis não anonimizados para fins de pesquisa ou políticas públicas, será solicitado consentimento específico, em destaque e inequívoco dos Cuidadores/Pais e Responsáveis Legais, conforme Art. 11, I e Art. 14 da LGPD.</strong></li>
              <li><strong>Chatbot de Inteligência Artificial (IA):</strong> Ferramenta interativa, limitada a 20 frases por interação, projetada para fornecer informações gerais e responder a dúvidas frequentes relacionadas a cuidados com crianças traqueostomizadas, com base em nosso banco de conhecimento e dados de fontes confiáveis. <strong>Esta funcionalidade é meramente informativa e não constitui, sob nenhuma circunstância, aconselhamento médico individualizado, diagnóstico, tratamento ou prescrição.</strong></li>
              <li><strong>Marketplace:</strong> Plataforma que permite a Cuidadores/Pais e Responsáveis Legais (Usuários Vendedores) oferecer e a outros Cuidadores/Pais e Responsáveis Legais (Usuários Compradores) buscar e adquirir produtos e/ou serviços relevantes para o cuidado de crianças traqueostomizadas. <strong>Nós atuamos exclusivamente como um intermediário na facilitação dessas transações, não sendo responsáveis pela qualidade, segurança, entrega, garantia ou conformidade legal dos produtos e serviços oferecidos por terceiros no Marketplace, nem pelas relações comerciais ou disputas entre Usuários Vendedores e Usuários Compradores.</strong></li>
              <li><strong>Chat Comunitário:</strong> Espaço interativo destinado à troca de experiências, apoio mútuo e comunicação entre Cuidadores/Pais e Responsáveis Legais de crianças traqueostomizadas. <strong>Este espaço é moderado por Nós, mas o conteúdo é gerado pelos Usuários, e as opiniões e informações ali compartilhadas não refletem necessariamente o nosso posicionamento, nem devem ser consideradas como aconselhamento médico.</strong></li>
            </ol>

            <div className={styles.warningBox}>
              <h4>2.2. Natureza Não Médica e Limitação de Responsabilidade:</h4>
              <p>
                a. <strong>O VapApp - Via Aérea Pediátrica É UMA FERRAMENTA DE APOIO, EDUCAÇÃO, REGISTRO E FACILITAÇÃO. ELE NÃO É UM SERVIÇO MÉDICO, NÃO FORNECE ACONSELHAMENTO CLÍNICO INDIVIDUALIZADO, DIAGNÓSTICO, TRATAMENTO OU PRESCRIÇÕES DE MEDICAMENTOS.</strong> As informações e conteúdos disponibilizados no Aplicativo são de caráter meramente informativo e educacional, e não devem, sob qualquer hipótese, ser interpretados como substituto de consulta, avaliação ou acompanhamento por profissionais de saúde qualificados (médicos, enfermeiros, fisioterapeutas, fonoaudiólogos, etc.). O Chatbot de Inteligência Artificial disponibilizado pelo Aplicativo, apesar de buscar fornecer informações úteis, baseia-se em algoritmos e dados pré-existentes. <strong>Suas respostas são geradas automaticamente e não possuem a capacidade de analisar o contexto clínico individual da Criança Traqueostomizada. Sendo assim, as informações fornecidas pelo Chatbot não substituem e nunca devem ser utilizadas como base para decisões de saúde, diagnósticos, tratamentos ou orientações clínicas, que devem ser sempre obtidas de profissionais de saúde qualificados.</strong>
              </p>
              <p>
                b. Você compreende e concorda que as informações fornecidas no Aplicativo não têm a finalidade de tratar, curar ou diagnosticar qualquer doença ou condição de saúde específica. Toda e qualquer decisão relacionada à saúde da Criança Traqueostomizada deve ser tomada em consulta e sob a orientação direta de profissionais de saúde devidamente habilitados. Em caso de emergências médicas, agravamento do estado de saúde da criança ou qualquer situação que demande atenção urgente, Você deve procurar imediatamente atendimento médico de emergência ou o profissional de saúde responsável, e não depender das funcionalidades do Aplicativo para tais situações. Não nos responsabilizamos por quaisquer danos, perdas ou prejuízos decorrentes do uso inadequado das informações ou funcionalidades do Aplicativo, <strong>incluindo aquelas geradas pelo Chatbot de IA,</strong> da sua interpretação equivocada do conteúdo aqui disponibilizado, ou da omissão em procurar a devida assistência médica profissional.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="cadastramento" className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Cadastramento e Acesso ao Aplicativo</h2>
            <p>
              <strong>3.1.</strong> Para acessar as funcionalidades do VapApp - Via Aérea Pediátrica, Você deverá realizar um cadastro, fornecendo as informações solicitadas de forma completa e precisa.
            </p>
            <p>
              <strong>3.2.</strong> Você é o único responsável pela veracidade, exatidão e atualização das informações fornecidas no cadastro, incluindo aquelas referentes à Criança Traqueostomizada. A inconsistência ou falsidade das informações poderá implicar na suspensão ou cancelamento do seu acesso ao Aplicativo e/ou na impossibilidade de utilização de determinadas funcionalidades.
            </p>
            <p>
              <strong>3.3.</strong> O login e senha criados para acesso ao Aplicativo são pessoais e intransferíveis. Você se compromete a manter o sigilo de suas credenciais, sendo integralmente responsável por todas as atividades realizadas em sua conta, mesmo que por terceiros, salvo comprovação de fraude ou falha de segurança do Aplicativo.
            </p>
            <p>
              <strong>3.4.</strong> Você deverá nos notificar imediatamente sobre qualquer uso não autorizado de sua conta ou qualquer outra violação de segurança.
            </p>
          </section>

          {/* Section 4 */}
          <section id="uso" className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Uso do Aplicativo e Conduta do Usuário</h2>
            <p>
              <strong>4.1.</strong> O Aplicativo deve ser utilizado de forma responsável, ética e em conformidade com a legislação brasileira aplicável, estes Termos de Uso e a Política de Privacidade.
            </p>
            <p>
              <strong>4.2.</strong> Você se compromete a não utilizar o Aplicativo para:
            </p>
            <ol type="a" className={styles.alphaList}>
              <li>Finalidades ilegais ou não autorizadas;</li>
              <li>Transmitir ou divulgar conteúdo ilegal, difamatório, calunioso, obsceno, discriminatório ou que viole direitos de terceiros, incluindo direitos de propriedade intelectual;</li>
              <li>Praticar atos de engenharia reversa, descompilação, ou tentar acessar o código-fonte do Aplicativo;</li>
              <li>Interferir, comprometer ou interromper a integridade ou o desempenho do Aplicativo ou de seus servidores e redes;</li>
              <li>Inserir ou transmitir quaisquer códigos maliciosos (vírus, trojans, malware, worms, etc.) no Aplicativo ou em sistemas a ele relacionados;</li>
              <li>Coletar ou armazenar dados pessoais de outros usuários sem o devido consentimento ou base legal;</li>
              <li>Utilizar o Chatbot de IA de forma abusiva, inserindo informações pessoais de terceiros sem consentimento, tentando obter diagnósticos ou tratamentos, ou de qualquer forma que desvirtue seu propósito informativo e educacional;</li>
              <li>Publicar, transmitir ou divulgar no Chat Comunitário informações falsas, enganosas, difamatórias, caluniosas, obscenas, discriminatórias, que incitem ódio, violência ou que violem os direitos de terceiros ou o bem-estar de crianças;</li>
              <li>Compartilhar no Chat Comunitário dados pessoais sensíveis de terceiros (incluindo outras Crianças Traqueostomizadas) sem o devido consentimento ou base legal. É recomendada extrema cautela ao compartilhar dados pessoais sensíveis da sua própria criança no chat, uma vez que se trata de um ambiente público ou semi-público.</li>
            </ol>
          </section>

          {/* Section 5 */}
          <section id="marketplace" className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Disposições Específicas do Marketplace</h2>
            <p>
              <strong>5.1. Natureza da Intermediação:</strong> Reconhecemos que Nós operamos como uma plataforma que conecta Usuários Vendedores e Usuários Compradores. <strong>Não somos fabricantes, distribuidores, fornecedores ou prestadores de serviços dos itens ou serviços listados no Marketplace.</strong>
            </p>
            <p>
              <strong>5.2. Responsabilidade dos Usuários:</strong>
            </p>
            <ol type="a" className={styles.alphaList}>
              <li><strong>Usuários Vendedores</strong> são integral e exclusivamente responsáveis pelos produtos e serviços que oferecem, incluindo sua legalidade, qualidade, segurança, preços, descrição, entrega, garantias e conformidade com as normas aplicáveis.</li>
              <li><strong>Usuários Compradores</strong> são responsáveis por verificar a adequação e a conformidade dos produtos e serviços antes da aquisição, bem como por realizar suas próprias diligências em relação aos Usuários Vendedores.</li>
            </ol>
            <p>
              <strong>5.3. Transações e Pagamentos:</strong> Quaisquer transações financeiras realizadas através do Marketplace são de responsabilidade exclusiva dos Usuários envolvidos. Eventuais sistemas de pagamento de terceiros (gateways de pagamento) utilizados estarão sujeitos aos termos e condições dessas plataformas. Não nos responsabilizamos por falhas, fraudes ou disputas relacionadas a pagamentos ou entregas.
            </p>
            <p>
              <strong>5.4. Conteúdo do Anúncio:</strong> Usuários Vendedores se comprometem a fornecer informações precisas, completas e verídicas sobre os produtos e serviços anunciados, não veiculando conteúdo enganoso, ilegal, ofensivo ou que viole direitos de terceiros.
            </p>
            <p>
              <strong>5.5. Resolução de Disputas:</strong> Embora não sejamos parte nas transações entre Usuários, podemos, a nosso critério e sem obrigação, oferecer ferramentas de comunicação ou mediação para auxiliar na resolução de disputas entre Usuários Compradores e Vendedores. Nenhuma decisão tomada por Nós nesse contexto será vinculante para as partes, que deverão buscar as vias legais cabíveis para a resolução definitiva.
            </p>
            <p>
              <strong>5.6. Taxas e Comissões:</strong> A utilização do Marketplace poderá estar sujeita a taxas ou comissões por transação ou por listagem, as quais serão informadas de forma clara e prévia aos Usuários Vendedores no momento da criação do anúncio ou da transação.
            </p>
            <p>
              <strong>5.7. Remoção de Conteúdo:</strong> Reservamo-nos o direito de, a nosso exclusivo critério, remover anúncios, suspender ou banir Usuários Vendedores ou Compradores que violem estes Termos de Uso, a Política de Privacidade ou qualquer legislação aplicável.
            </p>
          </section>

          {/* Section 6 */}
          <section id="propriedade" className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Propriedade Intelectual</h2>
            <p>
              <strong>6.1.</strong> Todos os direitos de propriedade intelectual relativos ao VapApp - Via Aérea Pediátrica, incluindo software, design, gráficos, textos, imagens, vídeos, material didático, marcas, logotipos, banco de dados e quaisquer outros conteúdos disponibilizados no Aplicativo, são de propriedade exclusiva de <strong>INNOVA DIGITAL LTDA, CNPJ: 61.674.924/0001-68</strong> ou de seus licenciadores, e estão protegidos pelas leis brasileiras e tratados internacionais de propriedade intelectual.
            </p>
            <p>
              <strong>6.2.</strong> O conteúdo gerado por Usuários, como descrições de produtos, imagens e avaliações no Marketplace e mensagens no Chat Comunitário, permanece de propriedade de seus respectivos criadores. No entanto, ao publicar tal conteúdo, o Usuário concede ao Aplicativo uma licença não-exclusiva, gratuita, global, transferível e sublicenciável para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir esse conteúdo em conexão com o funcionamento e a promoção do Marketplace e do Aplicativo.
            </p>
            <p>
              <strong>6.3.</strong> O acesso ao Aplicativo não confere a Você qualquer direito de uso, reprodução, distribuição, modificação, engenharia reversa ou qualquer outra forma de exploração comercial ou não comercial dos conteúdos ou do próprio Aplicativo, salvo com nossa prévia e expressa autorização por escrito.
            </p>
            <p>
              <strong>6.4.</strong> É expressamente proibida a utilização do Aplicativo para qualquer finalidade que não aquela para a qual foi concebido, bem como a comercialização de qualquer funcionalidade ou conteúdo, sob pena de responsabilidade civil e criminal.
            </p>
          </section>

          {/* Section 7 */}
          <section id="conteudo" className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Conteúdo Gerado pelo Usuário e Moderação (Chat Comunitário)</h2>
            <p>
              <strong>7.1. Conteúdo do Usuário:</strong> Você é o único responsável pelo conteúdo (mensagens, imagens, vídeos, etc.) que Você publica ou compartilha no Chat Comunitário. Você declara e garante que possui todos os direitos e autorizações necessárias para o conteúdo que postar.
            </p>
            <p>
              <strong>7.2. Licença de Uso:</strong> Ao publicar conteúdo no Chat Comunitário, Você nos concede uma licença não-exclusiva, gratuita, global, transferível e sublicenciável para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir tal conteúdo em conexão com o funcionamento e promoção do Aplicativo, sempre respeitando a sua privacidade e as configurações de visibilidade do chat.
            </p>
            <p>
              <strong>7.3. Moderação:</strong> Reservamo-nos o direito, mas não a obrigação, de monitorar, editar, remover ou bloquear qualquer conteúdo que consideremos, a nosso exclusivo critério, violar estes Termos de Uso, a Política de Privacidade, leis aplicáveis ou que seja prejudicial, ofensivo ou inadequado.
            </p>
            <p>
              <strong>7.4. Disclaimer sobre Conteúdo de Terceiros:</strong> Não endossamos, apoiamos, representamos ou garantimos a integridade, veracidade, exatidão ou confiabilidade de qualquer conteúdo comunicado por outros Usuários no Chat Comunitário, nem as opiniões expressas por eles. Você entende que, ao utilizar o Chat Comunitário, pode ser exposto a conteúdo ofensivo, prejudicial, impreciso ou inadequado.
            </p>
          </section>

          {/* Section 8 */}
          <section id="seguranca" className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Segurança da Informação</h2>
            <p>
              <strong>8.1.</strong> Nós empregamos as melhores práticas de mercado e as medidas técnicas e administrativas aptas a proteger os Dados Pessoais e Dados Pessoais Sensíveis contra acessos não autorizados, situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão, em conformidade com o Art. 46 da LGPD. Isso inclui, mas não se limita a, uso de criptografia, controle de acesso e auditorias regulares.
            </p>
            <p>
              <strong>8.2.</strong> Em caso de ocorrência de incidente de segurança que possa acarretar risco ou dano relevante aos direitos e liberdades dos Usuários e/ou das Crianças Traqueostomizadas, Nós notificaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os afetados, conforme o Art. 48 da LGPD, descrevendo as medidas adotadas para mitigar os impactos.
            </p>
          </section>

          {/* Section 9 */}
          <section id="limitacao" className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Limitação de Responsabilidade</h2>
            <p>
              <strong>9.1.</strong> O VapApp - Via Aérea Pediátrica é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;. Não garantimos que o Aplicativo será ininterrupto, livre de erros, seguro, que quaisquer defeitos serão corrigidos ou que ele estará livre de vírus ou outros componentes prejudiciais.
            </p>
            <p>
              <strong>9.2.</strong> Não nos responsabilizamos por perdas ou danos diretos ou indiretos decorrentes de:
            </p>
            <ol type="a" className={styles.alphaList}>
              <li>Uso inadequado do Aplicativo por Você, incluindo a má interpretação dos conteúdos ou a omissão em buscar aconselhamento médico profissional;</li>
              <li>Falhas ou indisponibilidade de rede, internet ou dispositivos móveis de propriedade do Usuário;</li>
              <li>Ataques de hackers, crackers ou softwares maliciosos que afetem o dispositivo do Usuário;</li>
              <li>Danos ou prejuízos causados por terceiros que não sejam nossos operadores diretos e que não estejam sob nosso controle;</li>
              <li>Qualquer decisão ou ação tomada por Você baseada exclusivamente nas informações ou funcionalidades do Aplicativo, sem a devida orientação de um profissional de saúde.</li>
            </ol>
            <p>
              <strong>9.3.</strong> Em nenhuma hipótese, seremos responsáveis por danos emergentes, lucros cessantes, perda de dados ou outras perdas intangíveis, mesmo que tenhamos sido avisados da possibilidade de tais danos.
            </p>
          </section>

          {/* Section 10 */}
          <section id="vigencia" className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Vigência, Rescisão e Suspensão</h2>
            <p>
              <strong>10.1.</strong> Estes Termos de Uso são válidos por prazo indeterminado, enquanto Você utilizar o Aplicativo.
            </p>
            <p>
              <strong>10.2.</strong> Poderemos rescindir ou suspender seu acesso ao Aplicativo a qualquer momento, sem aviso prévio, se houver violação destes Termos de Uso, da Política de Privacidade ou de qualquer lei aplicável.
            </p>
            <p>
              <strong>10.3.</strong> Você pode, a qualquer momento, descontinuar o uso do Aplicativo e solicitar a exclusão de sua conta, sujeita às condições de retenção de dados especificadas na Política de Privacidade.
            </p>
          </section>

          {/* Section 11 */}
          <section id="alteracoes" className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Alterações nos Termos de Uso</h2>
            <p>
              <strong>11.1.</strong> Estes Termos de Uso poderão ser atualizados a qualquer momento para adaptar-se às evoluções do serviço, novas funcionalidades, ou exigências legais.
            </p>
            <div className={styles.warningBox}>
              <p>
                <strong>11.2.</strong> Notificaremos Você sobre quaisquer alterações substanciais por meio de aviso no próprio Aplicativo ou outros meios de comunicação (ex: e-mail). A continuidade do uso do Aplicativo após a notificação das alterações constitui sua aceitação aos novos Termos. <strong>Caso Você não concorde com as alterações, Você terá o direito de não mais utilizar o Aplicativo e solicitar a exclusão de seus dados, conforme previsto na nossa Política de Privacidade.</strong>
              </p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="disposicoes" className={styles.section}>
            <h2 className={styles.sectionTitle}>12. Disposições Gerais</h2>
            <p>
              <strong>12.1.</strong> Se qualquer disposição destes Termos de Uso for considerada inválida ou inexequível, tal disposição será aplicada na extensão máxima permitida e as demais disposições permanecerão em pleno vigor e efeito.
            </p>
            <p>
              <strong>12.2.</strong> A nossa falha em exigir o cumprimento de qualquer disposição destes Termos de Uso não será interpretada como uma renúncia a tal disposição.
            </p>
          </section>

          {/* Section 13 */}
          <section id="legislacao" className={styles.section}>
            <h2 className={styles.sectionTitle}>13. Legislação Aplicável e Foro</h2>
            <p>
              <strong>13.1.</strong> Estes Termos de Uso serão regidos e interpretados de acordo com as leis da República Federativa do Brasil.
            </p>
            <p>
              <strong>13.2.</strong> Para dirimir quaisquer dúvidas ou controvérsias decorrentes destes Termos de Uso, fica eleito o foro do domicílio do Usuário.
            </p>
          </section>

          {/* Section 14 */}
          <section id="contato" className={styles.section}>
            <h2 className={styles.sectionTitle}>14. Canais de Contato</h2>
            <p>
              Para quaisquer dúvidas, sugestões ou problemas relacionados ao uso do Aplicativo, Você pode entrar em contato conosco através do e-mail:{" "}
              <a href="mailto:comunicacao@vap-app.com.br" style={{ color: "#00949d", fontWeight: 600 }}>comunicacao@vap-app.com.br</a>.
            </p>
            <div className={styles.contactBox}>
              <h4>Encarregado de Dados (DPO)</h4>
              <p>Para questões relacionadas à privacidade e proteção de dados pessoais, incluindo o exercício dos seus direitos como titular de dados ou como responsável legal da Criança Traqueostomizada, o contato do nosso Encarregado de Dados (DPO) é:</p>
              <p><strong>E-mail:</strong> <a href="mailto:dpo@vap-app.com.br">dpo@vap-app.com.br</a></p>
            </div>
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
            Voltar para a Pagina Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
