import styles from "./StatCard.module.css";
import Tooltip from "./Tooltip";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple";
  tooltipText?: string;
  subValue?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  tooltipText,
  subValue,
}: StatCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title}</p>
          {tooltipText && <Tooltip text={tooltipText} />}
        </div>
        <div className={styles.valueContainer}>
          <p className={styles.value}>{value}</p>
          {subValue && <p className={styles.subValue}>{subValue}</p>}
        </div>
      </div>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>{icon}</div>
    </div>
  );
};

export default StatCard;