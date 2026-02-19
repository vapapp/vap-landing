"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.logoWrapper} style={{ position: "relative" }}>
              <Image
                src="/images/brand/logo.png"
                alt="VAP-App"
                fill
                className={styles.logo}
              />
            </div>
            <p className={styles.description}>
              Plataforma de apoio e validacao para cuidadores de criancas com traqueostomia.
            </p>
            <p className={styles.cnpj}>
              CNPJ: 61.674.924/0001-68
            </p>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Links Uteis</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/suporte" className={styles.link}>
                  Suporte
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className={styles.link}>
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className={styles.link}>
                  Politica de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/exclusao-de-dados" className={styles.link}>
                  Exclusao de Dados
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contato</h4>
            <ul className={styles.links}>
              <li>
                <a href="mailto:contato@vap-app.com.br" className={styles.link}>
                  contato@vap-app.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>&copy; {currentYear} VAP-App. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
