"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Clock,
  ChevronDown,
  Smartphone,
  Shield,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  Heart,
  FileText,
} from "lucide-react";
import Link from "next/link";
import LightRays from "@/components/ui/LightRays";
import { Button } from "@/components/ui/Button";
import styles from "./Suporte.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "O VapApp é gratuito?",
    answer:
      "Sim! O aplicativo é 100% gratuito e não possui anúncios. Nosso objetivo é apoiar cuidadores sem barreiras financeiras.",
  },
  {
    question: "Preciso criar uma conta?",
    answer:
      "Sim, você precisa criar uma conta para acessar todos os recursos e sincronizar seus dados com segurança na nuvem.",
  },
  {
    question: "Como cadastrar uma criança?",
    answer:
      'Na tela inicial, toque em "Cadastrar Criança" e preencha o formulário de 8 seções. Seus dados são salvos automaticamente conforme você avança.',
  },
  {
    question: "A calculadora de cânulas é confiável?",
    answer:
      "Sim, a calculadora usa fórmulas médicas validadas por profissionais de saúde. No entanto, sempre consulte um médico antes de tomar decisões sobre tratamentos.",
  },
  {
    question: "Como funciona a comunidade?",
    answer:
      "O chat conecta pais e cuidadores em tempo real para troca de experiências e apoio mútuo. Tenha respeito e siga as regras da comunidade.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Sim! Usamos criptografia de ponta a ponta e seguimos rigorosamente a LGPD. Seus dados médicos são privados e nunca compartilhados sem sua autorização.",
  },
  {
    question: "Posso usar offline?",
    answer:
      "Algumas funcionalidades funcionam offline (calculadora, visualização de dados salvos), mas a comunidade e sincronização de dados requerem conexão com internet.",
  },
  {
    question: "Como faço backup dos meus dados?",
    answer:
      "Os dados são automaticamente sincronizados na nuvem quando você está conectado à internet. Você não precisa se preocupar com perda de informações.",
  },
  {
    question: "O app substitui consultas médicas?",
    answer:
      "NÃO. O VapApp é uma ferramenta de apoio e organização, mas NUNCA substitui orientação médica profissional. Sempre consulte seu médico.",
  },
  {
    question: "Encontrei um bug, como reporto?",
    answer:
      "Envie um email para comunicacao@vap-app.com.br com detalhes do problema, screenshots se possível, e informações sobre seu dispositivo. Responderemos em até 48h.",
  },
];

const features = [
  "Calculadora de cânulas de traqueostomia",
  "Cadastro completo de crianças",
  "Diário de cuidados",
  "Quiz educativo (2500+ questões)",
  "Biblioteca de ebooks",
  "Comunidade de pais",
  "Notificações de lembretes",
  "Histórico médico organizado",
];

function FAQAccordion({ faq, index }: { faq: FAQItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className={styles.faqItem}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        className={`${styles.faqQuestion} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{faq.question}</span>
        <ChevronDown
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.faqAnswer}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SuporteClient() {
  return (
    <main className={styles.main}>
      {/* Background com LightRays */}
      <div className={styles.background}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00949D"
          raysSpeed={0.6}
          lightSpread={0.5}
          rayLength={1.0}
          followMouse={true}
          mouseInfluence={0.08}
          noiseAmount={0.03}
          distortion={0.03}
        />
      </div>

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.iconWrapper}>
            <Heart className={styles.headerIcon} />
          </div>
          <h1 className={styles.title}>Central de Suporte</h1>
          <p className={styles.subtitle}>
            Estamos aqui para ajudar você e sua família em cada passo da jornada
          </p>
        </motion.div>

        {/* Seção de Contato */}
        <motion.section
          className={styles.contactSection}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <MessageCircle className={styles.sectionIcon} />
            <h2>Entre em Contato</h2>
          </div>
          <div className={styles.contactCards}>
            <div className={styles.contactCard}>
              <Mail className={styles.contactIcon} />
              <div className={styles.contactInfo}>
                <h3>Email de Suporte</h3>
                <a href="mailto:comunicacao@vap-app.com.br" className={styles.contactLink}>
                  comunicacao@vap-app.com.br
                </a>
              </div>
            </div>
            <div className={styles.contactCard}>
              <Clock className={styles.contactIcon} />
              <div className={styles.contactInfo}>
                <h3>Tempo de Resposta</h3>
                <p>24-48 horas úteis</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <BookOpen className={styles.sectionIcon} />
            <h2>Perguntas Frequentes</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} faq={faq} index={index} />
            ))}
          </div>
        </section>

        {/* Requisitos do Sistema */}
        <motion.section
          className={styles.requirementsSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <Smartphone className={styles.sectionIcon} />
            <h2>Requisitos do Sistema</h2>
          </div>
          <div className={styles.requirementsGrid}>
            <div className={styles.requirementCard}>
              <h3>iOS</h3>
              <p>Versão 13.0 ou superior</p>
            </div>
            <div className={styles.requirementCard}>
              <h3>Android</h3>
              <p>Versão 8.0 ou superior</p>
            </div>
            <div className={styles.requirementCard}>
              <h3>Conexão</h3>
              <p>Internet recomendada</p>
              <span className={styles.requirementNote}>
                (algumas funções offline)
              </span>
            </div>
            <div className={styles.requirementCard}>
              <h3>Versão Atual</h3>
              <p className={styles.version}>v1.0.0</p>
              <span className={styles.requirementNote}>Lançamento inicial</span>
            </div>
          </div>
        </motion.section>

        {/* Recursos do App */}
        <motion.section
          className={styles.featuresSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <CheckCircle2 className={styles.sectionIcon} />
            <h2>Recursos do Aplicativo</h2>
          </div>
          <div className={styles.featuresList}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.featureItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <CheckCircle2 className={styles.featureIcon} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Privacidade e Links */}
        <motion.section
          className={styles.linksSection}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <Shield className={styles.sectionIcon} />
            <h2>Privacidade e Segurança</h2>
          </div>
          <p className={styles.privacyText}>
            Para informações sobre como tratamos seus dados, acesse nossa política
            de privacidade e saiba mais sobre seus direitos.
          </p>
          <div className={styles.linkButtons}>
            <Link href="/politica-de-privacidade" passHref>
              <Button variant="default" size="lg">
                <FileText className={styles.buttonIcon} />
                Política de Privacidade
              </Button>
            </Link>
            <Link href="/exclusao-de-dados" passHref>
              <Button variant="outline" size="lg">
                <Shield className={styles.buttonIcon} />
                Solicitar Exclusão de Dados
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2026 Inovva Digital. Todos os direitos reservados.</p>
          <p className={styles.footerNote}>
            O VapApp é uma ferramenta de apoio e nunca substitui orientação médica
            profissional.
          </p>
        </footer>
      </div>
    </main>
  );
}
