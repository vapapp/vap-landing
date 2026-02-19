import { notFound } from 'next/navigation';
import Formulario from './Formulario';
import styles from './Questionario.module.css';

export default function IniciarQuestionarioPage() {
  notFound();
  return (
    <main className={styles.pageContainer}>
      <Formulario />
    </main>
  );
}