import styles from "./ChartCard.module.css";
import Tooltip from "./Tooltip";

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  tooltipText?: string;
}

const ChartCard = ({ title, children, tooltipText }: ChartCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {tooltipText && <Tooltip text={tooltipText} />}
      </div>
      <div className={styles.chartContainer}>{children}</div>
    </div>
  );
};

export default ChartCard;
