"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "./AppScreenshots.module.css";

const screenshots = [
  {
    id: 1,
    title: "Cadastro da Criança",
    description: "Cadastro completo com informações médicas e histórico",
    image: "/screenshots/screenshot-1.png",
  },
  {
    id: 2,
    title: "Calculadora de Cânula",
    description: "Ferramenta para calcular o tamanho ideal da cânula",
    image: "/screenshots/screenshot-2.png",
  },
  {
    id: 3,
    title: "Comunidade",
    description: "Conecte-se com outros cuidadores e compartilhe experiências",
    image: "/screenshots/screenshot-3.png",
  },
  {
    id: 4,
    title: "Dr. VAP",
    description: "Assistente inteligente que tira dúvidas sobre traqueostomia",
    image: "/screenshots/screenshot-4.png",
  },
  {
    id: 5,
    title: "Quizz Educativos",
    description: "Teste seus conhecimentos de forma interativa",
    image: "/screenshots/screenshot-5.png",
  },
  {
    id: 6,
    title: "Ebooks Acolhedores",
    description: "Material de leitura completo sobre cuidados",
    image: "/screenshots/screenshot-6.png",
  },
  {
    id: 7,
    title: "Diário de Eventos",
    description: "Registre e acompanhe todas as intercorrências",
    image: "/screenshots/screenshot-7.png",
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction * 50,
    scale: 0.96,
    filter: "blur(4px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -50,
    scale: 0.96,
    filter: "blur(4px)",
  }),
};

const AUTOPLAY_INTERVAL = 4000;

function AppScreenshots() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Autoplay — pausa ao passar o mouse
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  return (
    <section
      className={styles.section}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            Veja o app
            <span className={styles.highlight}> em ação</span>
          </h2>
          <p className={styles.subtitle}>
            Conheça a interface intuitiva e as funcionalidades que vão
            transformar o seu dia a dia.
          </p>
        </motion.div>

        {/* Carrossel de Screenshots */}
        <motion.div
          className={styles.carouselSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >

          <div className={styles.carousel}>
            {/* Botão Anterior */}
            <button
              className={`${styles.navButton} ${styles.navButtonLeft}`}
              onClick={prevSlide}
              aria-label="Screenshot anterior"
            >
              <ChevronLeft className={styles.navIcon} />
            </button>

            {/* Screenshots */}
            <div className={styles.screenshotsContainer}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  className={styles.screenshotWrapper}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.45,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className={styles.phoneMockup}>
                    <div className={styles.phoneNotch} />
                    <div className={styles.phoneScreen}>
                      <Image
                        src={screenshots[currentIndex].image}
                        alt={screenshots[currentIndex].title}
                        fill
                        className={styles.screenshotImage}
                        priority={currentIndex === 0}
                      />
                    </div>
                  </div>
                  <div className={styles.screenshotInfo}>
                    <h4 className={styles.screenshotTitle}>
                      {screenshots[currentIndex].title}
                    </h4>
                    <p className={styles.screenshotDescription}>
                      {screenshots[currentIndex].description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Botão Próximo */}
            <button
              className={`${styles.navButton} ${styles.navButtonRight}`}
              onClick={nextSlide}
              aria-label="Próximo screenshot"
            >
              <ChevronRight className={styles.navIcon} />
            </button>
          </div>

          {/* Indicadores */}
          <div className={styles.indicators}>
            {screenshots.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.indicatorActive : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para screenshot ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { AppScreenshots };
