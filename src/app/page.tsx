import Squares from "../components/ui/Squares";
import { TerminalLoader } from "../components/ui/TerminalLoader";
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
   
      <div className={styles.background}>
        <Squares
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#00ff00" 
          hoverFillColor="#333"
        />
      </div>

     
      <div className={styles.content}>
        
        <TerminalLoader />
      </div>
    </main>
  );
}