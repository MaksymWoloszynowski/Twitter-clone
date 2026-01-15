import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Join today</h1>
        <p className={styles.subtitle}>See what’s happening in the world right now.</p>

        <div className={styles.actions}>
          <Link to="/register" className={styles.primaryButton}>
            Create account
          </Link>
          <p>or</p>
          <Link to="/login" className={styles.secondaryButton}>
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;