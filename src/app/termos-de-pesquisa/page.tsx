import styles from "./Termos.module.css";
import Link from "next/link";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Termos de Consentimento da Pesquisa",
  description:
    "Leia os termos de consentimento para participação na pesquisa de validação do VAP-App.",
};

export default function TermosDePesquisaPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>
          Termo de Consentimento Livre e Esclarecido – Pesquisa VAP-App
        </h1>

        <p>
          Agradecemos seu interesse em participar da pesquisa de desenvolvimento do
          VAP-App. Antes de prosseguir, é fundamental que você leia atentamente as informações
          abaixo para tomar uma decisão informada.
        </p>

        <section>
          <h2 className={styles.sectionTitle}>1. Objetivo da Pesquisa</h2>
          <p>
            Este questionário tem como finalidade coletar dados para o
            desenvolvimento e validação do VAP-App, uma ferramenta digital projetada para apoiar
            cuidadores de crianças com traqueostomia e outras necessidades
            respiratórias complexas. Suas respostas são essenciais para entendermos
            seus desafios, validarmos funcionalidades e criarmos uma solução que
            realmente agregue valor e segurança ao seu dia a dia.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>2. Coleta e Tratamento dos Dados</h2>
          <p>
            Sua participação é voluntária e requer o fornecimento de nome e um meio de contato (e-mail ou
            telefone), além das respostas ao questionário. Esclarecemos abaixo como seus dados serão tratados:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Dados Identificáveis (Nome, contato, CEP, etc.):</strong> Serão
              armazenados de forma segura e utilizados para o registro de sua participação.
              Caso opte por permitir, poderemos usar seu contato para pesquisas futuras sobre o VAP-App.
            </li>
            <li>
              <strong>Dados da Pesquisa (Suas Respostas):</strong> Suas respostas ficarão
              vinculadas aos seus dados de identificação em nossa base de dados. Isso nos permite realizar uma análise aprofundada e, se necessário, entender contextos específicos para o aprimoramento do aplicativo.
            </li>
            <li>
              <strong>Uso em Relatórios e Publicações:</strong> Para fins de divulgação, relatórios e publicações acadêmicas, todos os dados serão tratados de forma agregada e <strong>anonimizada</strong>. A sua identidade individual jamais será exposta publicamente.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>3. Confidencialidade e Segurança</h2>
          <p>
            Garantimos o sigilo e a confidencialidade de todas as suas informações. O acesso aos dados brutos e identificáveis será restrito exclusivamente à equipe de pesquisa responsável pelo VAP-App. Todo o tratamento de dados está em estrita conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>4. Direitos do Participante</h2>
          <ul className={styles.list}>
            <li>Você tem o direito de não responder a qualquer pergunta ou desistir de participar a qualquer momento, bastando fechar o formulário.</li>
            <li>Não há respostas &ldquo;certas&rdquo; ou &ldquo;erradas&rdquo;. Valorizamos sua perspectiva e experiência sincera.</li>
            <li>A participação ou não participação não acarretará qualquer penalidade ou perda de benefícios.</li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            5. Declaração de Consentimento
          </h2>
          <p>
            Ao marcar a opção{" "}
            <strong>
              &ldquo;Li e concordo com os termos da pesquisa&rdquo;
            </strong>{" "}
            no questionário, você declara que:
          </p>
          <ul className={styles.list}>
            <li>Leu, compreendeu e concorda com todas as informações deste termo.</li>
            <li>Sua participação é livre e voluntária.</li>
            <li>
              Está ciente de que suas respostas serão analisadas de forma <strong>confidencial</strong>, mas não anônima, pela equipe de pesquisa, e que seus dados de contato serão mantidos em sigilo.
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className={styles.sectionTitle}>6. Agradecimento</h2>
          <p>
            Sua colaboração é fundamental para a construção de uma ferramenta que
            possa trazer mais segurança e apoio para inúmeras famílias. Agradecemos imensamente seu tempo e sua contribuição.
          </p>
        </section>

        <div className={styles.buttonContainer}>
          <Link href="/questionario/iniciar" className={styles.backButton}>
            Voltar ao Questionário
          </Link>
        </div>
      </div>
    </main>
  );
}