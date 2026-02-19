import { notFound } from "next/navigation";
import styles from "./Termos.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termo de Consentimento para Tratamento de Dados",
  description:
    "Leia os termos de consentimento para tratamento de dados para a pesquisa de validação do VAP-App.",
};

export default function TermosDePesquisaPage() {
  notFound();
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.mainTitle}>
          Termo de Consentimento para Tratamento de Dados Pessoais – Pesquisa
          VAP-App
        </h1>

        <p>
          Este documento tem o objetivo de informar você, pai ou cuidador
          (&quot;Titular&quot;), sobre como seus dados pessoais e os dados
          pessoais sensíveis da criança sob seus cuidados serão tratados no
          âmbito da pesquisa de desenvolvimento do aplicativo VAP-App, em
          conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018).
        </p>
        <p>
          Sua leitura atenta e compreensão são fundamentais antes de prosseguir.
        </p>

        <section>
          <h2 className={styles.sectionTitle}>
            1. Identificação do Controlador e do Encarregado (DPO)
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Controlador dos Dados:</strong> INNOVA DIGITAL LTDA.,
              pessoa jurídica de direito privado, inscrita no CNPJ sob o nº
              61.674.924/0001-68, com sede na AV FERNANDES LIMA, 08, EDIF
              CENTENARIO PLAZA CENTER, SALA 406, BAIRRO FAROL, MACEIO, AL, CEP
              57.050-000. A INNOVA DIGITAL LTDA. é a empresa responsável pelas
              decisões sobre o tratamento dos seus dados e dos dados da criança.
            </li>
            <li>
              <strong>Encarregado pelo Tratamento de Dados (DPO):</strong>{" "}
              <strong>Wander Mattos</strong>. Em caso de dúvidas sobre o
              tratamento de seus dados ou para exercer seus direitos, entre em
              contato pelo e-mail:{" "}
              <strong>dpo@vap-app.com.br</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            2. Objetivo da Pesquisa e Finalidade do Tratamento de Dados
          </h2>
          <p>
            Este questionário tem como finalidade coletar dados para o
            desenvolvimento e validação do VAP-App, uma ferramenta digital
            projetada para apoiar cuidadores de crianças com traqueostomia e
            outras necessidades respiratórias complexas. Suas respostas são
            essenciais para entendermos seus desafios, validarmos
            funcionalidades e criarmos uma solução que realmente agregue valor e
            segurança ao seu dia a dia.
          </p>
          <p>
            Coletamos seus dados e os dados da criança para as seguintes
            finalidades específicas:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Dados Cadastrais (Nome do Titular, e-mail/telefone do Titular):</strong>
              <br />
              Finalidade: Identificar sua participação na pesquisa e, com seu consentimento adicional, entrar em contato para futuras pesquisas de aprofundamento sobre o VAP-App.
            </li>
            <li>
              <strong>Dados Demográficos (CEP ou Cidade/Estado do Titular):</strong>
              <br />
              Finalidade: Realizar análises estatísticas e agregadas para entender o perfil geográfico dos participantes, sem identificar sua residência exata.
            </li>
            <li>
              <strong>Dados da Pesquisa (Suas Respostas e Informações sobre a Criança):</strong>
              <br />
              Finalidade: Compreender os desafios, necessidades e experiências de cuidadores de crianças com traqueostomia e outras condições respiratórias para validar e aprimorar as funcionalidades do VAP-App. Isso inclui informações sobre a rotina de cuidados, desafios enfrentados, e aspectos relacionados à saúde da criança.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            3. Tratamento de Dados Pessoais Sensíveis
          </h2>
          <p>
            As respostas ao questionário podem incluir informações sobre a saúde da criança sob seus cuidados (ex: condição respiratória, histórico de traqueostomia, outras necessidades de saúde). Estas são classificadas como dados pessoais sensíveis pela LGPD (Art. 5º, II).
          </p>
          <p>
            O tratamento desses dados sensíveis se dará exclusivamente para as finalidades descritas no item 2, visando o desenvolvimento de um aplicativo de apoio à saúde, e será protegido com rigorosas medidas de segurança. Seu consentimento para o tratamento destes dados sensíveis, em nome da criança, é fundamental e deve ser manifestado de forma destacada.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>
            4. Confidencialidade, Segurança e Compartilhamento de Dados
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Não compartilhamento:</strong> Seus dados pessoais e os dados da criança não serão vendidos, alugados ou compartilhados com terceiros para fins comerciais ou de marketing.
            </li>
            <li>
              <strong>Fornecedores de Tecnologia:</strong> Utilizamos serviços de armazenamento em nuvem de fornecedores com alto padrão de segurança (ex: Google Cloud, AWS). Isso pode implicar em transferência internacional de dados, a qual é realizada em conformidade com a LGPD, para países que oferecem grau de proteção de dados adequado ou por meio de cláusulas contratuais que asseguram o cumprimento da LGPD.
            </li>
            <li>
              <strong>Uso em Relatórios e Publicações:</strong> Para fins de divulgação, relatórios e publicações acadêmicas, todos os dados serão tratados de forma agregada e anonimizada. A sua identidade individual e a da criança jamais serão expostas publicamente.
            </li>
            <li>
              <strong>Medidas de Segurança:</strong> Implementamos medidas técnicas e administrativas para proteger seus dados, como criptografia, controle de acesso restrito e monitoramento constante, visando prevenir acessos não autorizados e situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou difusão.
            </li>
          </ul>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>5. Período de Retenção dos Dados</h2>
          <p>
            Os dados identificáveis (seus dados de contato) e as respostas da pesquisa serão mantidos em nossa base segura pelo período de <strong>5 anos</strong> após o término da fase de pesquisa, prazo necessário para análises longitudinais e publicações científicas relacionadas ao desenvolvimento do VAP-App.
          </p>
          <p>
            Após este período, os dados identificáveis serão eliminados de forma segura, e as respostas da pesquisa serão mantidas de forma totalmente anonimizada para fins estatísticos e de aprimoramento contínuo do aplicativo.
          </p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>6. Seus Direitos como Titular de Dados</h2>
          <p>
            A qualquer momento, você pode solicitar gratuitamente à INNOVA DIGITAL LTDA., através do e-mail do Encarregado (DPO) informado no item 1, os seguintes direitos previstos na LGPD:
          </p>
          <ol type="a" className={styles.alphaList}>
            <li>Confirmação da existência de tratamento de seus dados;</li>
            <li>Acesso aos seus dados;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;</li>
            <li>Portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa;</li>
            <li>Eliminação dos dados tratados com o seu consentimento, ressalvadas as exceções legais;</li>
            <li>Informação sobre as entidades públicas e privadas com as quais o Controlador realizou uso compartilhado de dados;</li>
            <li>Informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa;</li>
            <li>Revogação do consentimento.</li>
          </ol>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>7. Declaração de Consentimento</h2>
          <p>
            Ao marcar a opção no questionário, você declara que:
          </p>
          <ul className={styles.list}>
            <li>Leu, compreendeu e concorda com todas as informações deste termo.</li>
            <li>Sua participação é livre e voluntária, e você tem o direito de não responder a qualquer pergunta ou desistir de participar a qualquer momento, bastando fechar o formulário.</li>
            <li>Está ciente de que suas respostas serão analisadas de forma confidencial, mas não anônima, pela equipe de pesquisa da INNOVA DIGITAL LTDA., e que seus dados de contato serão mantidos em sigilo.</li>
            <li>Concede seu consentimento livre, informado e inequívoco para o tratamento de seus dados pessoais e dos dados pessoais sensíveis da criança sob seus cuidados, para as finalidades aqui descritas.</li>
          </ul>
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
