import styles from "./TweetStats.module.css";
import api from "../../api/api";
import { useState } from "react";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const TweetStats = ({ tweet, onReply }) => {
  const [likes, setLikes] = useState(Number(tweet.like_count));
  const [liked, setLiked] = useState(Boolean(tweet.liked_by_me));

  const [bookmarks, setBookmarks] = useState(Number(tweet.bookmark_count));
  const [bookmarked, setBookmarked] = useState(Boolean(tweet.bookmarked_by_me));

  const toggleAction = async (count, status, endpoint, setCount, setStatus) => {
    const prevCount = count;
    const prevStatus = status;

    setCount(prevCount + (prevStatus ? -1 : 1));
    setStatus(!prevStatus);

    try {
      if (!prevStatus) {
        await api.post(endpoint);
      } else {
        await api.delete(endpoint);
      }
    } catch {
      setStatus(prevLiked);
      setCount(prevLikes);
    }
  };

  const handleLike = async (e) => {
    e.stopPropagation();

    toggleAction(
      likes,
      liked,
      `/tweets/${tweet.tweet_id}/like`,
      setLikes,
      setLiked
    );
  };

  const handleReply = (e) => {
    e.stopPropagation();
    onReply();
  };

  const handleBookmark = async (e) => {
    e.stopPropagation();

    toggleAction(
      bookmarks,
      bookmarked,
      `/tweets/${tweet.tweet_id}/bookmark`,
      setBookmarks,
      setBookmarked
    );
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

      <span className={styles.bookmark} onClick={handleBookmark}>
        <Bookmark className={bookmarked ? styles.bookmarked : ""} /> {bookmarks}
      </span>
    </footer>
  );
};

export default TweetStats;
