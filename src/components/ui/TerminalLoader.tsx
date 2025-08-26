"use client"; 

import React, { useState, useEffect } from 'react';
import styles from './TerminalLoader.module.css';


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
      
      
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
      } else {
        setCurrentText(prev => fullPhrase.substring(0, prev.length + 1));
      }

     
      if (!isDeleting && currentText === fullPhrase) {
        
        setTimeout(() => setIsDeleting(true), 2000);
      } 
      
      else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const typingSpeed = isDeleting ? 100 : 150;
    const timer = setTimeout(handleTyping, typingSpeed);

   
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
      
      <div className={styles.text}>
        {currentText}
      </div>
    </div>
  );
};
