"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { GooglePlayIcon } from "@/components/icons/GooglePlayIcon";
import { Button } from "@/components/ui/Button";
import styles from "./AppHero.module.css";

function AppHero() {
  return (
    <div className={styles.container}>
      <div className={styles.heroContent}>

        {/* Texto Principal */}
        <motion.div
          className={styles.textContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            Disponível em breve
          </motion.span>

          <h1 className={styles.heading}>
            Cuidar nunca foi
            <span className={styles.highlight}> tão seguro</span>
          </h1>

          <p className={styles.description}>
            O aplicativo que traz segurança e tranquilidade para cuidadores de
            crianças com traqueostomia e outras necessidades respiratórias complexas.
          </p>

          {/* Botões das Stores */}
          <div className={styles.storeButtons}>
            <motion.div
              className={styles.storeButtonWrapper}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="default"
                className={styles.storeButton}
                onClick={() => alert("Em breve na App Store!")}
              >
                <AppleIcon className={styles.storeIcon} />
                <div className={styles.storeText}>
                  <span className={styles.storeLabel}>Baixar na</span>
                  <span className={styles.storeName}>App Store</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              className={styles.storeButtonWrapper}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className={styles.storeButton}
                onClick={() => window.open("https://play.google.com/store/apps/details?id=com.vapapp.aplicativo", "_blank")}
              >
                <GooglePlayIcon className={styles.storeIcon} />
                <div className={styles.storeText}>
                  <span className={styles.storeLabel}>Disponível no</span>
                  <span className={styles.storeName}>Google Play</span>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mockup do App */}
        <motion.div
          className={styles.mockupContainer}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.phoneMockup}>
            <div className={styles.phoneNotch} />
            <div className={styles.phoneScreen}>
              <Image
                src="/images/hero/app-dashboard.png"
                alt="Dashboard do VAP-App"
                fill
                className={styles.screenshotImage}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats — separado para permitir reordenação no mobile */}
        <motion.div
          className={styles.statsOuter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className={styles.stats}>
            {/* Itens reais */}
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
              </div>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Gratuito</span>
            </motion.div>
            <div className={styles.statDivider} />
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>
              </div>
              <span className={styles.statNumber}>iOS & Android</span>
              <span className={styles.statLabel}>Multiplataforma</span>
            </motion.div>
            <div className={styles.statDivider} />
            <motion.div className={styles.stat} whileHover={{ scale: 1.05 }}>
              <div className={styles.statIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
              </div>
              <span className={styles.statNumber}>24/7</span>
              <span className={styles.statLabel}>Sempre disponível</span>
            </motion.div>

            {/* Duplicados para loop seamless no mobile (ocultos no desktop) */}
            <div className={styles.statsDuplicate} aria-hidden="true">
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                </div>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Gratuito</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor"><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>
                </div>
                <span className={styles.statNumber}>iOS & Android</span>
                <span className={styles.statLabel}>Multiplataforma</span>
              </div>
              <div className={styles.stat}>
                <div className={styles.statIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg>
                </div>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Sempre disponível</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export { AppHero };
