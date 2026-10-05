import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./Explore.module.css";
import ProfilesList from "../../components/ProfilesList";
import TweetList from "../../components/tweet/TweetList";
import SearchInput from "../../components/SearchInput";

const Explore = () => {
  const [params, setParams] = useSearchParams();

  const queryParam = params.get("q") || "";
  const fParam = params.get("f") || "tweets";
  const allowedFeed = ["tweets", "users"];

  const [input, setInput] = useState(queryParam);
  const [feedType, setFeedType] = useState(
    allowedFeed.includes(fParam) ? fParam : "tweets"
  );
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const f = allowedFeed.includes(fParam) ? fParam : "tweets";
    if (f !== fParam) setParams({ q: queryParam, f });
    setFeedType(f);
    setInput(queryParam);
  }, [fParam, queryParam, setParams]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!input.trim()) return;
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(input)}`);
        setTweets(res.data.tweets);
        setUsers(res.data.users);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [input]);

  const handleFeedChange = (type) => {
    if (!allowedFeed.includes(type)) type = "tweets";
    setFeedType(type);
    setParams({ q: input, f: type });
  };

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <SearchInput defaultValue={input} />
        <div className={styles.tabs}>
          <button
            onClick={() => handleFeedChange("tweets")}
            className={feedType === "tweets" ? styles.active : ""}
          >
            Most recent
          </button>
          <button
            onClick={() => handleFeedChange("users")}
            className={feedType === "users" ? styles.active : ""}
          >
            Users
          </button>
        </div>
      </header>

      <div className={styles.results}>
        {loading && <p>Searching…</p>}
        {!loading && feedType === "tweets" && <TweetList tweets={tweets} />}
        {!loading && feedType === "users" && <ProfilesList profiles={users} />}
      </div>
    </div>
  );
};

export default Explore;
