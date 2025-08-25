import Squares from "../app/components/ui/Squares";
import { TerminalLoader } from "../app/components/ui/TerminalLoader";
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      {/* Componente de Fundo */}
      {/* A div wrapper foi mantida para o posicionamento, mas a opacidade foi removida */}
      <div className={styles.background}>
        <Squares
          speed={0.3}
          squareSize={40}
          direction="diagonal"
          borderColor="#00ff00" // Cor verde brilhante para o grid
          hoverFillColor="#333"
        />
      </div>

      {/* Conteúdo Central */}
      <div className={styles.content}>
        
        <TerminalLoader />
      </div>
    </main>
  );
}