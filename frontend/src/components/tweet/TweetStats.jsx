import styles from "./TweetStats.module.css";
import api from "../../api/api";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const TweetStats = ({ tweet, onReply }) => {
  const [likes, setLikes] = useState(Number(tweet.like_count));
  const [liked, setLiked] = useState(Boolean(tweet.liked_by_me));

  const handleLike = async (e) => {
    e.stopPropagation();

    const prevLiked = liked;
    const prevLikes = likes;

    setLiked(!prevLiked);
    setLikes(prevLikes + (prevLiked ? -1 : 1));

    try {
      if (!prevLiked) {
        await api.post(`/tweets/${tweet.tweet_id}/like`);
      } else {
        await api.delete(`/tweets/${tweet.tweet_id}/like`);
      }
    } catch {
      setLiked(prevLiked);
      setLikes(prevLikes);
    }
  };

  const handleReply = (e) => {
    e.stopPropagation();
    onReply();
  };

  return (
    <footer className={styles.actions}>
      <span onClick={handleReply}>
        <MessageCircle /> {tweet.comment_count}
      </span>

      <span className={styles.heart} onClick={handleLike}>
        <Heart className={liked ? styles.liked : ""} />
        {likes}
      </span>

      <span className={styles.bookmark}>
        <Bookmark />
      </span>
    </footer>
  );
};

export default TweetStats;
