import { useState } from "react";
import api from "../api/api";
import styles from "./CreateTweet.module.css";

const MAX_LENGTH = 280;

export default function CreateTweet({ onTweetCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = content.trim();
    if (!text || text.length > MAX_LENGTH || loading) return;

    setLoading(true);
    try {
      await api.post("/tweets/create", { content: text });
      setContent("");
      onTweetCreated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit}>
      <div className={styles.avatar} />

      <div className={styles.main}>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What’s happening?"
        />

        <div className={styles.footer}>
          <span
            className={
              content.length > MAX_LENGTH
                ? styles.counterError
                : styles.counter
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
}