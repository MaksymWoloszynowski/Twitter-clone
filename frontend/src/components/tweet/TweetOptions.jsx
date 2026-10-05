import styles from "./TweetOptions.module.css";
import useAuth from "../../hooks/useAuth";
import { Trash2 } from "lucide-react";
import api from "../../api/api";

const TweetOptions = ({ tweet, setShowOptions }) => {
  const { auth } = useAuth();

  const isMe = tweet.username === auth.username;

  const handleDelete = async () => {
    try {
      await api.delete(`/tweets/${tweet.tweet_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
      {isMe && (
        <button className={styles.danger} onClick={handleDelete}>
          <Trash2 />
          <p>Delete</p>
        </button>
      )}
    </div>
  );
};

export default TweetOptions;
