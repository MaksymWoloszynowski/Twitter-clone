import styles from "./SettingsAccount.module.css";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";

const SettingsAccount = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "This action is permanent. Your account and all data will be removed. Continue?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);      
      await api.delete("/users/me");
      logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.title}>Your account</div>

      <div className={styles.dangerZone}>
        <div>Danger zone</div>
        <p>
          Deleting your account is permanent. Your profile, tweets and
          interactions will no longer be available.
        </p>

        <button
          className={styles.deleteButton}
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          {loading ? "Deleting…" : "Delete account"}
        </button>
      </div>
    </section>
  );
};

export default SettingsAccount;
