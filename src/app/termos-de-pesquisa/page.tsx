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
          Agradecemos seu interesse em participar da pesquisa de validação do
          VAP-App. Antes de começar, por favor, leia atentamente as informações
          abaixo.
        </p>

        <section>
          <h2 className={styles.sectionTitle}>1. Objetivo da Pesquisa</h2>
          <p>
            Este questionário tem como finalidade coletar dados para o
            desenvolvimento do VAP-App, um aplicativo projetado para apoiar
            cuidadores de crianças com traqueostomia e outras necessidades
            respiratórias complexas. Suas respostas nos ajudarão a entender
            seus desafios, validar funcionalidades e criar uma ferramenta que
            realmente faça a diferença.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>2. Coleta e Uso dos Dados</h2>
          <p>
            Sua participação é totalmente voluntária. Para participar, é
            necessário o preenchimento dos campos de nome e contato (e-mail ou
            telefone). Esclarecemos como cada tipo de dado será utilizado:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Dados de Contato (Nome, e-mail/telefone):</strong> Estes
              dados são coletados para o registro da sua participação e serão
              armazenados de forma segura e separada das suas outras respostas.
              Só utilizaremos esses dados para entrar em contato futuramente
              caso você marque a opção que nos autoriza a fazê-lo.
            </li>
            <li>
              <strong>Dados da Pesquisa (Suas Respostas):</strong> Todas as
              suas respostas sobre experiências e opiniões serão analisadas de
              forma anônima. Isso significa que, ao gerarmos nossos relatórios
              e estudos, suas respostas serão agrupadas com as de outros
              participantes e nunca serão associadas publicamente ao seu nome.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>3. Confidencialidade e LGPD</h2>
          <p>
            Garantimos a confidencialidade de todas as informações. Os dados
            serão armazenados de forma segura e utilizados exclusivamente para
            os fins desta pesquisa, em conformidade com a Lei Geral de Proteção
            de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>4. Direitos do Participante</h2>
          <ul className={styles.list}>
            <li>
              Suas respostas não têm certo ou errado; o que importa é a sua
              vivência.
            </li>
            <li>
              Para que a pesquisa seja válida, o preenchimento de todas as
              perguntas é necessário. No entanto, você pode desistir de
              participar e fechar o questionário a qualquer momento, sem
              qualquer prejuízo.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            5. Declaração de Consentimento
          </h2>
          <p>
            Ao marcar a opção{" "}
            <strong>
              &quot;Li e estou de acordo com os termos da pesquisa&quot;
            </strong>{" "}
            no início do questionário, você declara que:
          </p>
          <ul className={styles.list}>
            <li>Leu e compreendeu todas as informações deste termo.</li>
            <li>Participa de forma livre e voluntária.</li>
            <li>
              Está ciente de que suas respostas serão analisadas de forma
              anônima e que seus dados de contato serão mantidos em sigilo.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>6. Agradecimento</h2>
          <p>
            Sua colaboração é fundamental para construirmos uma ferramenta que
            traga mais segurança, confiança e apoio para cuidadores e suas
            famílias. Muito obrigado!
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