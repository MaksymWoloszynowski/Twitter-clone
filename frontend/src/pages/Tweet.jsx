import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import Comments from "../components/Comments";
import styles from "./Tweet.module.css";
import useLikes from "../hooks/useLikes";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

const Tweet = () => {
  const { tweetId } = useParams();
  const [comments, setComments] = useState([]);
  const [tweet, setTweet] = useState({});
  const [loading, setLoading] = useState(true);

  const { likes, liked, handleLike } = useLikes({ tweet });

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await api.get(`/tweets/${tweetId}`);
        setTweet(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTweet();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/tweets/${tweetId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, []);

  if (loading) return <p>Loading tweet</p>;

  const formatDate = (date) => {
    const d = new Date(date);

    const time = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(d);

    const datePart = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(d);

    return {
      hour: time,
      date: datePart
  };
}

  return (
    <div className={styles.container}>
      <article className={styles.tweet}>
        <header className={styles.header}>
          <div className={styles.avatar} />

          <div className={styles.user}>
            <p className={styles.username}>{tweet.username}</p>
            <p className={styles.handle}>@{tweet.username}</p>
          </div>
        </header>

        <p className={styles.content}>{tweet.content}</p>

        <div className={styles.meta}>
          <span>{formatDate(tweet.created_at).hour}</span>
          <span className={styles.dot}>·</span>
          <span>{formatDate(tweet.created_at).date}</span>
        </div>

        <footer className={styles.actions}>
          <span>
            <MessageCircle /> {tweet.comment_count}
          </span>
          <span className={styles.heart} onClick={handleLike}>
            <Heart className={liked ? styles.liked : ""} />
            {likes}
          </span>
          <span>
            <Bookmark />
            {likes}
          </span>
        </footer>
      </article>

      <Comments comments={comments} />
    </div>
  );
};

export default Tweet;
