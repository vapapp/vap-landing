import styles from "./InsightCard.module.css";

interface InsightCardProps {
  value: string;
  description: string;
  color: "blue" | "red" | "green";
}

const InsightCard = ({ value, description, color }: InsightCardProps) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <p className={styles.value}>{value}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default InsightCard;
