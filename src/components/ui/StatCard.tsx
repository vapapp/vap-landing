import styles from "./StatCard.module.css";
import Tooltip from "./Tooltip";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple";
  tooltipText?: string;
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  tooltipText,
}: StatCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{title}</p>
          {tooltipText && <Tooltip text={tooltipText} />}
        </div>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>{icon}</div>
    </div>
  );
};

export default StatCard;
