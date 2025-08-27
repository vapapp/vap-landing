import styles from "./ChartCard.module.css";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard = ({ title, children }: ChartCardProps) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartContainer}>{children}</div>
    </div>
  );
};

export default ChartCard;
