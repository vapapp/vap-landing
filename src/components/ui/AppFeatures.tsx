"use client";

import { motion } from "framer-motion";
import {
  Video,
  Bot,
  BookOpen,
  Users,
  ShoppingCart,
  BrainCircuit,
  BookHeart,
  UserPlus,
} from "lucide-react";
import styles from "./AppFeatures.module.css";

const features = [
  {
    icon: BrainCircuit,
    title: "Quizz Educativos",
    description:
      "Teste seus conhecimentos sobre cuidados com traqueostomia através de quizzes interativos e didáticos.",
    comingSoon: false,
  },
  {
    icon: BookHeart,
    title: "Ebooks Acolhedores",
    description:
      "Material de leitura completo e acolhedor sobre traqueostomia, cuidados e experiências reais.",
    comingSoon: false,
  },
  {
    icon: UserPlus,
    title: "Cadastro da Criança",
    description:
      "Cadastro completo com informações médicas para auxiliar em funcionalidades futuras, leis públicas e mapeamento das crianças.",
    comingSoon: false,
  },
  {
    icon: Bot,
    title: "Assistente Inteligente",
    description:
      "IA que oferece orientação inicial e tira dúvidas sobre traqueostomia.",
    comingSoon: false,
    disclaimer: true,
  },
  {
    icon: BookOpen,
    title: "Diário de Eventos",
    description:
      "Prontuário digital para registrar intercorrências e compartilhar com a equipe médica.",
    comingSoon: false,
  },
  {
    icon: Users,
    title: "Comunidade Segura",
    description:
      "Espaço moderado para cuidadores conversarem, tirarem dúvidas e encontrarem apoio.",
    comingSoon: false,
  },
  {
    icon: Video,
    title: "Vídeos Educacionais",
    description:
      "Biblioteca de vídeos curtos demonstrando procedimentos como troca de cânula e aspiração.",
    comingSoon: true,
  },
  {
    icon: ShoppingCart,
    title: "Marketplace Integrado",
    description:
      "Facilite a compra de cânulas, fixadores e outros materiais essenciais de forma rápida.",
    comingSoon: true,
  },
];

function AppFeatures() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            Tudo que você precisa,
            <span className={styles.highlight}> em um só lugar</span>
          </h2>
          <p className={styles.subtitle}>
            O VAP-App reúne funcionalidades essenciais para tornar o cuidado
            mais seguro e organizado.
          </p>
        </motion.div>

        {/* Grid de Features */}
        <div className={styles.grid}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className={`${styles.card} ${feature.comingSoon ? styles.cardComingSoon : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {feature.comingSoon && (
                  <div className={styles.comingSoonBadge}>
                    <span>EM BREVE</span>
                  </div>
                )}
                <div className={styles.iconContainer}>
                  <Icon className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                {feature.disclaimer && (
                  <div className={styles.disclaimer}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="currentColor" className={styles.disclaimerIcon}>
                      <path d="M320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72zM380 384.8C374.6 384.3 369 384 363.4 384L276.5 384C270.9 384 265.4 384.3 259.9 384.8L259.9 452.3C276.4 459.9 287.9 476.6 287.9 495.9C287.9 522.4 266.4 543.9 239.9 543.9C213.4 543.9 191.9 522.4 191.9 495.9C191.9 476.5 203.4 459.8 219.9 452.3L219.9 393.9C157 417 112 477.6 112 548.6C112 563.7 124.3 576 139.4 576L500.5 576C515.6 576 527.9 563.7 527.9 548.6C527.9 477.6 482.9 417.1 419.9 394L419.9 431.4C443.2 439.6 459.9 461.9 459.9 488L459.9 520C459.9 531 450.9 540 439.9 540C428.9 540 419.9 531 419.9 520L419.9 488C419.9 477 410.9 468 399.9 468C388.9 468 379.9 477 379.9 488L379.9 520C379.9 531 370.9 540 359.9 540C348.9 540 339.9 531 339.9 520L339.9 488C339.9 461.9 356.6 439.7 379.9 431.4L379.9 384.8z"/>
                    </svg>
                    <span className={styles.disclaimerText}>
                      Não substitui orientação médica
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { AppFeatures };
