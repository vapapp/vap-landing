"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Mail, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";
import Link from "next/link"; 

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amor", "força", "coragem", "paciência", "esperança"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className={styles.container}>
      <div className={styles.heroContent}>

        <div className={styles.topButtons}>
          <Link href="/suporte" passHref>
            <Button variant="secondary" size="sm">
              Suporte <HelpCircle className={styles.icon} />
            </Button>
          </Link>
          <Link href="/politica-de-privacidade" passHref>
            <Button variant="secondary" size="sm">
              Privacidade <FileText className={styles.icon} />
            </Button>
          </Link>
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.heading}>
            Cuidar é um ato de
            <span className={styles.animatedTextWrapper}>
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className={styles.animatedText}
                  initial={{ opacity: 0, y: "100%" }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? "-100%" : "100%", opacity: 0 }
                  }
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h1>

          <p className={styles.description}>
            Sabemos que a jornada com uma criança que tem necessidades
            respiratórias complexas é cheia de desafios. O VAP-App nasceu para
            ser seu parceiro, trazendo segurança e tranquilidade para o seu dia
            a dia.
          </p>
        </div>

        <div className={styles.actions}>
        
          <a href="mailto:comunicacao@vap-app.com.br">
            <Button size="lg" variant="outline">
              Fale Conosco <Mail className={styles.icon} />
            </Button>
          </a>
          
          <Link href="/questionario" passHref>
            <Button size="lg" variant="default">
              Responder Pesquisa <MoveRight className={styles.icon} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export { Hero };