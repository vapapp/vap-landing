import Link from 'next/link';
import styles from './Welcome.module.css';

export default function WelcomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
        </div>
        <h1 className={styles.title}>Ajude a Moldar o Futuro do Cuidado Pediátrico</h1>
        <p className={styles.description}>
          Sua experiência como cuidador(a) de uma criança com necessidades respiratórias é extremamente valiosa. Este questionário rápido nos ajudará a construir uma ferramenta de apoio que realmente faça a diferença na sua jornada.
        </p>
        <div className={styles.timeEstimate}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          <span>Tempo estimado: 5 minutos</span>
        </div>
        <Link href="/questionario/iniciar" className={styles.startButton}>
          Iniciar Pesquisa
        </Link>
      </div>
    </main>
  );
}