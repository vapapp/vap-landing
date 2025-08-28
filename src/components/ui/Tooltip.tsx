"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  text: string;
}

const Tooltip = ({ text }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      
      
      tooltip.classList.remove(styles.shiftLeft, styles.shiftRight);

      
      if (rect.right > window.innerWidth) {
        tooltip.classList.add(styles.shiftLeft);
      }
      
      else if (rect.left < 0) {
        tooltip.classList.add(styles.shiftRight);
      }
    }
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      tabIndex={0}
    >
      <div className={styles.icon}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      {isVisible && <div ref={tooltipRef} className={styles.tooltipBox}>{text}</div>}
    </div>
  );
};

export default Tooltip;