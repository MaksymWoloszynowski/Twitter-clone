import { useEffect, useState } from "react";
import api from "../../api/api";
import CreateTweet from "../../components/CreateTweet";
import TweetList from "../../components/tweet/TweetList";
import styles from "./Home.module.css";
import useSocket from "../../hooks/useSocket";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [feedType, setFeedType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasNewTweets, setHasNewTweets] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handler = ({ authorId }) => {
      setHasNewTweets(true);
    };

    socket.on("feed-update", handler);

    return () => {
      socket.off("feed-update", handler);
    };
  }, [socket]);

  const fetchTweets = async (type = feedType) => {
    try {
      setLoading(true);
      setError(null);

      const url = type === "following" ? "/tweets/following" : "/tweets";

      const res = await api.get(url);
      setTweets(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets("all");
  }, []);

  const handleForYou = () => {
    setFeedType("all");
    fetchTweets("all");
  };

  const handleFollowing = () => {
    setFeedType("following");
    fetchTweets("following");
    setHasNewTweets(false);
  };

  const handleRefetch = () => {
    setHasNewTweets(false);
    fetchTweets("following");
  };

  return (
    <main className={styles.home}>
      <nav className={styles.tabs}>
        <button
          onClick={handleForYou}
          className={feedType === "all" ? styles.active : ""}
        >
          For you
        </button>
        <button
          onClick={handleFollowing}
          className={`${styles.feedButton} ${
            feedType === "following" ? styles.active : ""
          }`}
        >
          Following
          {hasNewTweets && <div className={styles.badge}></div>}
        </button>
      </nav>

      <CreateTweet placeholder="What’s happening?" />

      {hasNewTweets && feedType === "following" && (
        <button className={styles.refetchButton} onClick={handleRefetch}>Show new tweets</button>
      )}

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && <TweetList tweets={tweets} />}
    </main>
  );
}
