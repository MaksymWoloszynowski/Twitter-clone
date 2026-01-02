import { useState } from "react";
import api from "../api/api";
import styles from "./CreateTweet.module.css";

const MAX_LENGTH = 280;

const CreateTweet = ({ endpoint = "/tweets/create", placeholder }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = content.trim();
    if (!text || text.length > MAX_LENGTH || loading) return;

    setLoading(true);
    try {
      await api.post(endpoint, { content: text });
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.main}>
        <div className={styles.top}>
          <div className={styles.avatar} />
          <textarea
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
          />
        </div>

        <div className={styles.footer}>
          <span
            className={
              content.length > MAX_LENGTH ? styles.counterError : styles.counter
            }
          >
            {content.length} / {MAX_LENGTH}
          </span>

          <button
            className={styles.button}
            disabled={!content.trim() || content.length > MAX_LENGTH || loading}
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateTweet;
