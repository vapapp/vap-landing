"use client";

import styles from "./Exclusao.module.css";
import Link from "next/link";
import {
  Home,
  Trash2,
  Shield,
  Mail,
  CheckCircle,
  AlertCircle,
  Clock,
  FileText,
  User,
  Database,
  XCircle
} from "lucide-react";

export default function ExclusaoDeDadosClient() {
  const emailSubject = "Solicitação de Exclusão de Conta VapApp";
  const emailBody = `Prezado(a) Encarregado de Dados,

Solicito a exclusão completa da minha conta e todos os dados associados no aplicativo VapApp - Via Aérea Pediátrica, conforme meu direito garantido pela LGPD (Art. 18, VI).

DADOS PARA IDENTIFICAÇÃO:
Nome completo: [PREENCHER SEU NOME]
Email cadastrado: [PREENCHER SEU EMAIL]
Telefone: [PREENCHER SEU TELEFONE - OPCIONAL]

CONFIRMAÇÃO:
Confirmo que solicito a exclusão completa e irreversível da minha conta e todos os dados pessoais associados ao VapApp, incluindo dados de saúde das crianças cadastradas.

Estou ciente de que:
- Esta ação é irreversível
- Não poderei recuperar os dados após a exclusão
- Receberei confirmação por email em até 15 dias úteis

Atenciosamente,
[SEU NOME]`;

  const mailtoLink = `mailto:dpo@vap-app.com.br?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

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
            <span className={styles.breadcrumbSeparator}>›</span>
            <span className={styles.breadcrumbCurrent}>
              <Trash2 size={16} />
              Exclusão de Dados
            </span>
          </div>

          <div className={styles.iconHeader}>
            <div className={styles.iconCircle}>
              <Shield size={48} />
            </div>
          </div>

          <h1 className={styles.mainTitle}>Exclusão de Conta e Dados</h1>

          <p className={styles.subtitle}>
            VapApp - Via Aérea Pediátrica
          </p>

          <p className={styles.intro}>
            Conforme a <strong>Lei Geral de Proteção de Dados (LGPD - Art. 18, VI)</strong>,
            você tem o direito de solicitar a exclusão completa da sua conta e de todos os
            dados pessoais armazenados em nosso aplicativo. Estamos aqui para garantir que
            esse processo seja simples, transparente e respeitoso.
          </p>
        </div>

        {/* Card Principal */}
        <div className={styles.card}>
          {/* Seção: Seus Direitos */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Shield size={32} />
            </div>
            <h2 className={styles.sectionTitle}>Seus Direitos de Privacidade</h2>

            <p>
              De acordo com a LGPD, você possui o <strong>direito à eliminação dos dados pessoais</strong> tratados
              com o seu consentimento. Respeitamos profundamente sua privacidade e garantimos que sua
              solicitação será atendida com total confidencialidade.
            </p>

            <div className={styles.highlightBox}>
              <h4>O que isso significa?</h4>
              <p>
                Você pode, a qualquer momento, solicitar que todos os seus dados pessoais e os dados de
                saúde das crianças sob sua responsabilidade sejam permanentemente excluídos de nossos sistemas.
                Esta é uma ação <strong>irreversível</strong> e você tem total controle sobre ela.
              </p>
            </div>
          </section>

          {/* Seção: Como Solicitar */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Mail size={32} />
            </div>
            <h2 className={styles.sectionTitle}>Como Solicitar a Exclusão</h2>

            <p className={styles.stepIntro}>
              Siga os passos abaixo para solicitar a exclusão da sua conta:
            </p>

            <div className={styles.stepsContainer}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Envie um Email</h3>
                  <p>
                    Envie sua solicitação para: <a href={mailtoLink} className={styles.emailLink}>
                      dpo@vap-app.com.br
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Use o Assunto Correto</h3>
                  <p>
                    <strong>Assunto:</strong> &ldquo;Solicitação de Exclusão de Conta VapApp&rdquo;
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Informe Seus Dados</h3>
                  <p>No corpo do email, inclua:</p>
                  <ul className={styles.list}>
                    <li><strong>Nome completo</strong></li>
                    <li><strong>Email cadastrado</strong> no aplicativo</li>
                    <li><strong>Telefone cadastrado</strong> (opcional)</li>
                    <li><strong>Confirmação:</strong> &ldquo;Solicito a exclusão completa da minha conta e dados&rdquo;</li>
                  </ul>
                </div>
              </div>

              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3>Aguarde a Confirmação</h3>
                  <p>
                    Processaremos sua solicitação em <strong>até 15 dias úteis</strong> e enviaremos
                    uma confirmação por email.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.ctaBox}>
              <a href={mailtoLink} className={styles.ctaButton}>
                <Mail size={20} />
                Solicitar Exclusão por Email
              </a>
              <p className={styles.ctaHelper}>
                O botão acima abrirá seu cliente de email com um template pré-preenchido
              </p>
            </div>
          </section>

          {/* Seção: O que Será Excluído */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Trash2 size={32} />
            </div>
            <h2 className={styles.sectionTitle}>O que Será Excluído</h2>

            <p>
              Ao solicitar a exclusão, os seguintes dados serão <strong>permanentemente removidos</strong>
              de nossos sistemas:
            </p>

            <div className={styles.dataGrid}>
              <div className={styles.dataItem}>
                <User className={styles.dataIcon} />
                <h4>Conta de Autenticação</h4>
                <p>Login, senha e credenciais de acesso</p>
              </div>

              <div className={styles.dataItem}>
                <FileText className={styles.dataIcon} />
                <h4>Dados Pessoais</h4>
                <p>Nome, email, telefone, CPF, endereço, foto de perfil</p>
              </div>

              <div className={styles.dataItem}>
                <Database className={styles.dataIcon} />
                <h4>Dados de Saúde</h4>
                <p>Histórico médico, traqueostomia, internações, medicamentos, exames</p>
              </div>

              <div className={styles.dataItem}>
                <Mail className={styles.dataIcon} />
                <h4>Mensagens e Interações</h4>
                <p>Mensagens da comunidade, reações, comentários</p>
              </div>

              <div className={styles.dataItem}>
                <CheckCircle className={styles.dataIcon} />
                <h4>Dispositivos Vinculados</h4>
                <p>Tokens de autenticação, sessões ativas</p>
              </div>

              <div className={styles.dataItem}>
                <FileText className={styles.dataIcon} />
                <h4>Fotos e Documentos</h4>
                <p>Todos os arquivos enviados por você</p>
              </div>
            </div>
          </section>

          {/* Seção: O que Pode Ser Mantido */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <AlertCircle size={32} />
            </div>
            <h2 className={styles.sectionTitle}>O que Pode Ser Mantido (Transparência Legal)</h2>

            <p>
              Por questões de <strong>conformidade legal e segurança</strong>, alguns dados podem ser
              retidos de forma <strong>anonimizada</strong> ou por exigência legal:
            </p>

            <div className={styles.retentionList}>
              <div className={styles.retentionItem}>
                <Clock className={styles.retentionIcon} />
                <div>
                  <h4>Logs de Auditoria e Segurança</h4>
                  <p>
                    Logs de acesso e auditoria são anonimizados e mantidos por <strong>90 dias</strong> para
                    conformidade com requisitos de segurança da informação e prevenção de fraudes.
                  </p>
                </div>
              </div>

              <div className={styles.retentionItem}>
                <Database className={styles.retentionIcon} />
                <div>
                  <h4>Dados Estatísticos Agregados</h4>
                  <p>
                    Dados anonimizados e agregados (sem qualquer identificação pessoal) podem ser mantidos
                    para análises estatísticas, pesquisas científicas e melhoria do aplicativo.
                  </p>
                </div>
              </div>

              <div className={styles.retentionItem}>
                <FileText className={styles.retentionIcon} />
                <div>
                  <h4>Registros Financeiros</h4>
                  <p>
                    Se houver transações financeiras (compras no marketplace), os registros contábeis devem
                    ser mantidos por <strong>5 anos</strong> conforme exigência da legislação fiscal brasileira.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Seção: Informações Importantes */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <AlertCircle size={32} />
            </div>
            <h2 className={styles.sectionTitle}>Informações Importantes</h2>

            <div className={styles.warningBoxes}>
              <div className={styles.warningBox}>
                <XCircle className={styles.warningIcon} />
                <div>
                  <h4>A Exclusão é Irreversível</h4>
                  <p>
                    Uma vez processada, a exclusão <strong>não pode ser desfeita</strong>. Todos os seus
                    dados e os dados de saúde das crianças cadastradas serão permanentemente removidos.
                  </p>
                </div>
              </div>

              <div className={styles.warningBox}>
                <Database className={styles.warningIcon} />
                <div>
                  <h4>Não Será Possível Recuperar</h4>
                  <p>
                    Após a exclusão, você <strong>não poderá recuperar</strong> nenhum dado, histórico
                    médico, mensagens ou documentos previamente armazenados.
                  </p>
                </div>
              </div>

              <div className={styles.warningBox}>
                <CheckCircle className={styles.warningIconSuccess} />
                <div>
                  <h4>Você Pode Criar Nova Conta</h4>
                  <p>
                    No futuro, você poderá criar uma nova conta no VapApp, mas ela começará do zero,
                    sem qualquer histórico ou dados anteriores.
                  </p>
                </div>
              </div>

              <div className={styles.warningBox}>
                <Clock className={styles.warningIcon} />
                <div>
                  <h4>Prazo de Processamento</h4>
                  <p>
                    Sua solicitação será processada em <strong>até 15 dias úteis</strong>. Você receberá
                    uma confirmação por email quando a exclusão for concluída.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Seção: Contato */}
          <section className={styles.section}>
            <div className={styles.sectionIcon}>
              <Mail size={32} />
            </div>
            <h2 className={styles.sectionTitle}>Contato do Encarregado de Dados (DPO)</h2>

            <div className={styles.contactBox}>
              <div className={styles.contactInfo}>
                <h4>Encarregado de Proteção de Dados (DPO)</h4>
                <p><strong>Nome:</strong> Kauê Cavalcante Wanderley de Melo</p>
                <p><strong>Email:</strong> <a href="mailto:dpo@vap-app.com.br">dpo@vap-app.com.br</a></p>
                <p><strong>Desenvolvedor:</strong> INNOVA DIGITAL LTDA.</p>
                <p><strong>CNPJ:</strong> 61.674.924/0001-68</p>
              </div>

              <div className={styles.contactActions}>
                <a href={mailtoLink} className={styles.contactButton}>
                  <Mail size={20} />
                  Enviar Solicitação
                </a>
                <Link href="/politica-de-privacidade" className={styles.linkButton}>
                  <Shield size={20} />
                  Ver Política de Privacidade
                </Link>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className={styles.footer}>
            <p>
              Dúvidas? Entre em contato com nosso DPO pelo email{" "}
              <a href="mailto:dpo@vap-app.com.br">dpo@vap-app.com.br</a>
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className={styles.bottomNav}>
          <Link href="/" className={styles.backButton}>
            <Home size={18} />
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </main>
  );
}
