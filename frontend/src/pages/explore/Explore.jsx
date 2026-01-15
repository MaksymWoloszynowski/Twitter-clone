import { Search, ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import styles from "./Explore.module.css";
import ProfilesList from "../../components/ProfilesList";
import TweetList from "../../components/tweet/TweetList";
import SearchInput from "../../components/SearchInput";

const Explore = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const type = params.get("f") || "";

  const [input, setInput] = useState(query);
  const [loading, setLoading] = useState(false);

  const [feedType, setFeedType] = useState("tweets");

  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.get(`/search?q=${encodeURIComponent(input)}`);
        setParams({ q: input, f: feedType });
        setTweets(res.data.tweets);
        setUsers(res.data.users);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [input, feedType]);

  useEffect(() => {
    const allowed = ["tweets", "users"];
    let f = params.get("f");

    if (!allowed.includes(f)) {
      f = "tweets";
      setParams({ q: input, f });
    }

    setFeedType(f);
  }, [params, input, setParams]);

  const handleFeedChange = (type) => {
    setFeedType(type);
    setParams({ q: input, f: type });
  };

  return (
    <div className={styles.container}>
      <header className={styles.topBar}>
        <SearchInput />
      </header>
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

      <div className={styles.results}>
        {loading && <p>Searching…</p>}

        {!loading && users && type === "users" && (
          <ProfilesList profiles={users} />
        )}

        {!loading && tweets && type === "tweets" && (
          <TweetList tweets={tweets} />
        )}
      </div>
    </div>
  );
};

export default Explore;
