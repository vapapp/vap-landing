"use client";

import styles from "./Charts.module.css";

interface FuncionalidadesChartProps {
  data: any[];
}

const COLORS: { [key: string]: string } = {
  Essencial: "#22c55e",
  "Muito Útil": "#3b82f6",
  Útil: "#f59e0b",
  "Pouco Útil": "#ef4444",
  Inútil: "#64748b",
};

const RATING_ORDER = [
  "Essencial",
  "Muito Útil",
  "Útil",
  "Pouco Útil",
  "Inútil",
];

const FuncionalidadesChart = ({ data }: FuncionalidadesChartProps) => {
  return (
    <div className={styles.funcionalidadesContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.funcionalidadeItem}>
          <div className={styles.itemHeader}>
            <h4>{item.name}</h4>
            <span className={styles.totalPercentage}>
              {((item["Essencial"] || 0) + (item["Muito Útil"] || 0)).toFixed(
                0
              )}
              %
            </span>
          </div>
          <div className={styles.stackedBar}>
            {RATING_ORDER.map((key) => {
              const value = item[key] || 0;
              if (value === 0) return null;
              return (
                <div
                  key={key}
                  className={styles.barSegment}
                  style={{ width: `${value}%`, backgroundColor: COLORS[key] }}
                  title={`${key}: ${Number(value).toFixed(1)}%`}
                />
              );
            })}
          </div>
          <div className={styles.legend}>
            {RATING_ORDER.map((key) => {
              const value = item[key] || 0;
              if (value === 0) return null;
              return (
                <div key={key} className={styles.legendItem}>
                  <span
                    className={styles.legendColor}
                    style={{ backgroundColor: COLORS[key] }}
                  ></span>
                  {key} ({Number(value).toFixed(0)}%)
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuncionalidadesChart;
