"use client";

import { motion } from "framer-motion";
import VideoPlayer from "@/components/ui/video-player";
import styles from "./AppVideoDemo.module.css";

export function AppVideoDemo() {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Conheça a
            <span className={styles.highlight}> história por trás</span>
          </h2>
          <p className={styles.subtitle}>
            Os criadores do VAP-App compartilham sua jornada e a motivação para criar esta solução
          </p>
        </div>

        {/* Video Player */}
        <div className={styles.videoWrapper}>
          <VideoPlayer src="https://firebasestorage.googleapis.com/v0/b/vap-app-9367c.firebasestorage.app/o/Meu%20Filme%202.mp4?alt=media&token=f4099344-cc54-46bf-b2d7-712e415882f6" />
        </div>
      </div>
    </motion.section>
  );
}
