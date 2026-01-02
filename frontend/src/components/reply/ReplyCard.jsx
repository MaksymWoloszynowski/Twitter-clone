import { X } from "lucide-react";
import CreateTweet from "../CreateTweet";
import styles from "./ReplyCard.module.css";

const ReplyCard = ({ tweet, onClose }) => {
  return (
    <div className={styles.container}>
      <X onClick={onClose} className={styles.close}/>
      <article className={styles.card}>
        <div className={styles.avatar} />

        <div className={styles.content}>
          <header className={styles.header}>
            <span className={styles.username}>{tweet.username}</span>
            <span className={styles.handle}>@{tweet.username}</span>
            <span className={styles.dot}>·</span>
            {/* <p className={styles.time}>{timeAgo(tweet.created_at)}</p> */}
          </header>

          <p className={styles.text}>{tweet.content}</p>
        </div>
      </article>

      <CreateTweet
        endpoint={`tweets/${tweet.tweet_id}/comment`}
        placeholder="Reply"
      />
    </div>
  );
};

export default ReplyCard;
