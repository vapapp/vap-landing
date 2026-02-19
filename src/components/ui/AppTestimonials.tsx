"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import styles from "./AppTestimonials.module.css";

// Depoimentos de exemplo - você pode substituir por depoimentos reais
const testimonials = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Mãe de Lucas, 3 anos",
    text: "O VAP-App transformou completamente a forma como cuido do meu filho. Agora me sinto muito mais segura e preparada para qualquer situação.",
    rating: 5,
    avatar: "M",
  },
  {
    id: 2,
    name: "João Santos",
    role: "Pai de Ana, 5 anos",
    text: "A comunidade do app me deu o apoio que eu tanto precisava. Conversar com outros pais que vivem a mesma realidade fez toda diferença.",
    rating: 5,
    avatar: "J",
  },
  {
    id: 3,
    name: "Carla Oliveira",
    role: "Avó de Pedro, 2 anos",
    text: "Os vídeos educacionais são incríveis! Aprendi procedimentos que antes me deixavam insegura. Recomendo para todos os cuidadores.",
    rating: 5,
    avatar: "C",
  },
];

const stats = [
  {
    number: "1000+",
    label: "Famílias apoiadas",
  },
  {
    number: "98%",
    label: "Satisfação",
  },
  {
    number: "24/7",
    label: "Suporte disponível",
  },
  {
    number: "100%",
    label: "Gratuito",
  },
];

function AppTestimonials() {
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
            Você não está
            <span className={styles.highlight}> sozinho</span>
          </h2>
          <p className={styles.subtitle}>
            Milhares de cuidadores já confiam no VAP-App para tornar o dia a dia
            mais seguro e tranquilo.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.statsGrid}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Quote className={styles.quoteIcon} />

              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className={styles.star} />
                ))}
              </div>

              <p className={styles.testimonialText}>{testimonial.text}</p>

              <div className={styles.testimonialAuthor}>
                <div className={styles.avatar}>
                  {testimonial.avatar}
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.authorName}>{testimonial.name}</div>
                  <div className={styles.authorRole}>{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { AppTestimonials };
