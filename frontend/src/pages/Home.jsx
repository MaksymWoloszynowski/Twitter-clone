import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import CreateTweet from "../components/CreateTweet";
import TweetList from "../components/tweet/TweetList";
import useLogout from "../hooks/useLogout";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const logout = useLogout();

  const [tweets, setTweets] = useState([]);
  const [feedType, setFeedType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
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
          className={feedType === "following" ? styles.active : ""}
        >
          Following
        </button>
      </nav>

      <CreateTweet placeholder="What’s happening?"/>

      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && <TweetList tweets={tweets} />}
    </main>
  );
}
