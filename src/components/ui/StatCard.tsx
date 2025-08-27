import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "red" | "purple";
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <div className={styles.card}>
      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.value}>{value}</p>
      </div>
      <div className={`${styles.iconWrapper} ${styles[color]}`}>{icon}</div>
    </div>
  );
};

export default StatCard;
