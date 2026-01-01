import { useNavigate } from "react-router-dom";
import styles from "./TweetCard.module.css";
import { MessageCircle, Heart } from "lucide-react";
import useLikes from "../hooks/useLikes";

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  const { likes, liked, handleLike } = useLikes({tweet});

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleClick = () => {
    navigate(`/profile/${tweet.username}/tweets/${tweet.tweet_id}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${tweet.username}/`);
  }

  return (
    <article className={styles.card} onClick={handleClick}>
      <div onClick={handleProfileClick} className={styles.avatar} />

      <div className={styles.content}>
        <header className={styles.header}>
          <span onClick={handleProfileClick} className={styles.username}>{tweet.username}</span>
          <span className={styles.dot}>·</span>
          <time className={styles.time}>{timeAgo(tweet.created_at)}</time>
        </header>

        <p className={styles.text}>{tweet.content}</p>

        <footer className={styles.actions}>
          <span>
            <MessageCircle /> {tweet.comment_count}
          </span>
          <span className={styles.heart} onClick={handleLike}>
            <Heart className={liked ? styles.liked : ""} />
            {likes}
          </span>
        </footer>
      </div>
    </article>
  );
};

export default TweetCard;
