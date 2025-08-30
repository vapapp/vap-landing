import { Hero } from "../components/ui/Hero";
import LightRays from "../components/ui/LightRays"; 
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
   
      <div className={styles.background}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00949D" 
          raysSpeed={0.8}
          lightSpread={0.7}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.05}
          distortion={0.05}
        />
      </div>

      <div className={styles.content}>
        <Hero />
      </div>
    </main>
  );
}