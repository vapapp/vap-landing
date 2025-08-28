import styles from "./InsightCard.module.css";
import Tooltip from "./Tooltip";

interface InsightCardProps {
  value: string;
  description: string;
  color: "blue" | "red" | "green";
  tooltipText?: string;
}

const InsightCard = ({
  value,
  description,
  color,
  tooltipText,
}: InsightCardProps) => {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <p className={styles.value}>{value}</p>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
    </div>
  );
};

export default InsightCard;
