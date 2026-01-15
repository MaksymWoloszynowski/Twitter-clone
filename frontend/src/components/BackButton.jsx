import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  return (
    <button className={styles.backButton} onClick={() => handleBack()}>
      <ArrowLeft />
    </button>
  );
};

export default BackButton;
