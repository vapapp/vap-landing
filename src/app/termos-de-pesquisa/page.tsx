import styles from "./Termos.module.css";
import Link from "next/link";

export default function TermosDePesquisaPage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>
          Termo de Consentimento para Participação na Pesquisa – VAP-App
        </h1>

        <section>
          <h2 className={styles.sectionTitle}>1. Objetivo</h2>
          <p>
            Este questionário integra a Seção de Validação do VAP‑App, um
            aplicativo em desenvolvimento com o propósito de apoiar cuidadores
            de crianças com traqueostomia e outras condições de saúde complexas.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            2. Confidencialidade e Proteção de Dados
          </h2>
          <p>A participação é voluntária.</p>
          <p>
            Todas as informações coletadas são confidenciais e serão utilizadas
            exclusivamente para fins de pesquisa e aprimoramento do aplicativo,
            conforme os princípios da Lei Geral de Proteção de Dados (LGPD).
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            3. Direitos e Responsabilidades
          </h2>
          <p>
            Você tem o direito de não se identificar, mas, se desejar participar
            de futuras etapas, poderá fornecer seu nome, e-mail ou telefone.
          </p>
          <p>
            Suas respostas não têm certo ou errado — o que importa é sua
            experiência e percepção pessoal.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            4. Declaração de Consentimento
          </h2>
          <p>
            Ao clicar no botão “Enviar” no final do questionário, você declara
            que:
          </p>
          <ul className={styles.list}>
            <li>Participa de forma livre e voluntária.</li>
            <li>
              Está ciente de que suas respostas serão usadas de forma anônima e
              exclusivamente para fins de pesquisa e desenvolvimento do VAP‑App.
            </li>
            <li>
              Tem ciência da finalidade e do uso dos seus dados, conforme
              descrito acima.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            5. Confirmação de Consentimento
          </h2>
          <p className={styles.consentCheck}>
            [ ] <strong>Li e estou de acordo com os termos acima.</strong>
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>6. Agradecimento</h2>
          <p>
            Agradecemos sua colaboração! Sua participação é fundamental para
            construirmos uma ferramenta que proporcione mais segurança,
            confiança e apoio aos cuidadores e familiares.
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
