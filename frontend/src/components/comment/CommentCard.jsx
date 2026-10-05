import styles from "./CommentCard.module.css";

const CommentCard = ({ comment }) => {
  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    return `${Math.floor(hours / 24)}d`;
  };
  
  return (
    <article className={styles.card}>
      <div className={styles.avatar} />

      <div className={styles.content}>
        <header className={styles.header}>
          <span className={styles.username}>{comment.username}</span>
          <span className={styles.handle}>@{comment.username}</span>
          <span className={styles.dot}>·</span>
          <p className={styles.time}>{timeAgo(comment.created_at)}</p>
        </header>

        <p className={styles.text}>{comment.content}</p>
      </div>
    </article>
  );
};

export default CommentCard;
