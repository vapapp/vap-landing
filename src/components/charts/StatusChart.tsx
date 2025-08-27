"use client";
import styles from "./Charts.module.css";

interface StatusChartProps {
  data: { name: string; value: number }[];
  total: number;
}

const COLORS = ["#dcfce7", "#dbeafe", "#fef9c3", "#f3f4f6"];

const StatusChart = ({ data, total }: StatusChartProps) => {
  if (total === 0) return <p>Nenhum dado para exibir.</p>;

  return (
    <div className={styles.statusContainer}>
      {data.map((item, index) => {
        const percentage = (item.value / total) * 100;
        return (
          <div
            key={item.name}
            className={styles.statusItem}
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          >
            <span>{item.name}</span>
            <strong>{percentage.toFixed(0)}%</strong>
          </div>
        );
      })}
    </div>
  );
};

export default StatusChart;
