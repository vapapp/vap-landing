"use client"; 

import React, { useState, useEffect } from 'react';
import styles from './TerminalLoader.module.css';

// testando servidor
interface TerminalLoaderProps {
  className?: string;
}

const phrases = [
  "Página em construção...",
  "Volte em breve!",
];

export const TerminalLoader: React.FC<TerminalLoaderProps> = ({ className = "" }) => {
  const [currentText, setCurrentText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = phrases[phraseIndex];
      
      // Lógica para apagar ou escrever
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText(prev => fullPhrase.substring(0, prev.length + 1));
      }

      // Se terminou de escrever a frase
      if (!isDeleting && currentText === fullPhrase) {
        // Pausa antes de começar a apagar
        setTimeout(() => setIsDeleting(true), 2000);
      } 
      // Se terminou de apagar
      else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        // Vai para a próxima frase
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

    // Limpa o timer ao desmontar o componente
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);
  
  const componentClassName = `${styles.terminalLoader} ${className}`;

  return (
    <div className={componentClassName}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>
          Status
        </div>
        <div className={styles.terminalControls}>
          <div className={`${styles.control} ${styles.close}`}></div>
          <div className={`${styles.control} ${styles.minimize}`}></div>
          <div className={`${styles.control} ${styles.maximize}`}></div>
        </div>
      </div>
      {/* O texto agora é dinâmico e o cursor piscando é controlado pelo CSS */}
      <div className={styles.text}>
        {currentText}
      </div>
    </div>
  );
};
