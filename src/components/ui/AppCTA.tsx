"use client";

import { motion } from "framer-motion";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { GooglePlayIcon } from "@/components/icons/GooglePlayIcon";
import { Button } from "@/components/ui/Button";
import styles from "./AppCTA.module.css";

function AppCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaCard}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Lançamento em breve
          </motion.span>

          {/* Título */}
          <h2 className={styles.title}>
            Pronto para transformar
            <span className={styles.highlight}> o cuidado?</span>
          </h2>

          <p className={styles.description}>
            Faça o download do VAP-App e tenha acesso a todas as ferramentas que
            vão trazer mais segurança e tranquilidade para o seu dia a dia.
          </p>

          {/* Botões das Stores */}
          <div className={styles.storeButtons}>
            <motion.div className={styles.storeButtonWrapper} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

            <motion.div className={styles.storeButtonWrapper} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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

          {/* Informação adicional */}
          <p className={styles.footnote}>
            100% gratuito • Sem anúncios • Disponível para iOS e Android
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export { AppCTA };
