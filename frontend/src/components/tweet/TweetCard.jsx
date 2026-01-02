import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./TweetCard.module.css";
import TweetStats from "./TweetStats";
import ReplyModal from "../reply/ReplyModal";
import ReplyCard from "../reply/ReplyCard";

const TweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  const [isReplying, setIsReplying] = useState(false);

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };

  const handleClick = () => {
    navigate(`/profile/${tweet.username}/tweets/${tweet.tweet_id}`);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${tweet.username}`);
  };

  return (
    <>
      <article className={styles.card} onClick={handleClick}>
        <div onClick={handleProfileClick} className={styles.avatar} />

        <div className={styles.content}>
          <header className={styles.header}>
            <span onClick={handleProfileClick} className={styles.username}>
              {tweet.username}
            </span>
            <span className={styles.handle}>@{tweet.username}</span>
            <span className={styles.dot}>·</span>
            <p className={styles.time}>{timeAgo(tweet.created_at)}</p>
          </header>

          <p className={styles.text}>{tweet.content}</p>

          <TweetStats tweet={tweet} onReply={() => setIsReplying(true)} />
        </div>
      </article>

      {isReplying && (
        <ReplyModal onClose={() => setIsReplying(false)}>
          <ReplyCard onClose={() => setIsReplying(false)} tweet={tweet} />
        </ReplyModal>
      )}
    </>
  );
};

export default TweetCard;
