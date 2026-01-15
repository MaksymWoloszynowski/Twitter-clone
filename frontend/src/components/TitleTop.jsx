import BackButton from "./BackButton";
import styles from "./TitleTop.module.css";

const TitleTop = ({ title }) => {
  return (
    <div className={styles.top}>
      <BackButton />
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default TitleTop;
