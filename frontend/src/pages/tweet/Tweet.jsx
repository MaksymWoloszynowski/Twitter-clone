import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import Comments from "../../components/comment/Comments";
import styles from "./Tweet.module.css";
import CreateTweet from "../../components/CreateTweet";
import TweetStats from "../../components/tweet/TweetStats";
import TitleTop from "../../components/TitleTop";
import ReplyModal from "../../components/reply/ReplyModal";
import ReplyCard from "../../components/reply/ReplyCard";

const Tweet = () => {
  const { tweetId } = useParams();
  const [comments, setComments] = useState([]);
  const [tweet, setTweet] = useState({});
  const [loading, setLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);

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
      date: datePart,
    };
  };

  return (
    <>
      <div className={styles.container}>
        <TitleTop title={"Tweet"} />
        <article className={styles.tweet}>
          <header className={styles.header}>
            <Link to={`/profile/${tweet.username}`}>
              <div className={styles.avatar} />
            </Link>

            <div className={styles.user}>
              <Link to={`/profile/${tweet.username}`}>
                <p className={styles.username}>{tweet.username}</p>
              </Link>
              <Link to={`/profile/${tweet.username}`}>
                <p className={styles.handle}>@{tweet.username}</p>
              </Link>
            </div>
          </header>

          <p className={styles.content}>{tweet.content}</p>

          <div className={styles.meta}>
            <span>{formatDate(tweet.created_at).hour}</span>
            <span className={styles.dot}>·</span>
            <span>{formatDate(tweet.created_at).date}</span>
          </div>

          <TweetStats tweet={tweet} onReply={() => setIsReplying(true)}/>
        </article>
        <CreateTweet
          endpoint={`/tweets/${tweetId}/comment`}
          placeholder="Reply"
        />
        <Comments comments={comments} />
      </div>
      {isReplying && (
        <ReplyModal onClose={() => setIsReplying(false)}>
          <ReplyCard onClose={() => setIsReplying(false)} tweet={tweet} />
        </ReplyModal>
      )}
    </>
  );
};

export default Tweet;
