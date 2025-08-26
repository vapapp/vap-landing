import Formulario from './Formulario';
import styles from './Questionario.module.css';

export default function IniciarQuestionarioPage() {
  return (
    <main className={styles.pageContainer}>
      <Formulario />
    </main>
  );
}