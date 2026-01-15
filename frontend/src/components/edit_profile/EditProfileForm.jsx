import { useState } from "react";
import api from "../../api/api";
import { X } from "lucide-react";
import { useEffect } from "react";
import styles from "./EditProfileForm.module.css";
import { useNavigate } from "react-router-dom";

const EditProfileForm = ({ user, onClose }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newBio, setNewBio] = useState(user.bio);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    setErrMsg("");
  }, [newUsername, newBio]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/users/${user.username}`, { newUsername, newBio });
      navigate(`/profile/${newUsername}`)
      onClose()
    } catch (err) {
      const message = err.response?.data?.message || "Update failed";
      setErrMsg(message);
    }
  };

  return (
    <div className={styles.container}>
      <p className={errMsg ? styles.error : styles.invisible}>{errMsg}</p>

      
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.top}>
        <div>
          <X onClick={onClose} className={styles.close} />
          <span className={styles.title}>Edit Profile</span>
        </div>

        <button className={styles.saveButton}>Save</button>
      </div>
        <label className={styles.label} htmlFor="email">
          Username:
        </label>
        <input
          type="text"
          onChange={(e) => setNewUsername(e.target.value)}
          value={newUsername}
          className={styles.input}
        />

        <label className={styles.label} htmlFor="password">
          Bio:
        </label>
        <input
          type="text"
          onChange={(e) => setNewBio(e.target.value)}
          value={newBio}
          className={styles.input}
        />
      </form>
    </div>
  );
};

export default EditProfileForm;
