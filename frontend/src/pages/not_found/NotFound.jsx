import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.text}>This page doesn’t exist</p>
      <button className={styles.button} onClick={() => navigate("/home")}>
        Go home
      </button>
    </div>
  );
};

export default NotFound;