import { useEffect } from "react";
import { useState } from "react";
import api from "../api/api";
import useAuth from "../hooks/useAuth";
import TweetList from "../components/tweet/TweetList";
import styles from "./Bookmarks.module.css"

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/users/${auth.username}/bookmarks`);
        setBookmarks(response.data);
      } catch (error) {
        console.log(error.response.data);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <div>
      {loading && <p className={styles.info}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && <TweetList tweets={bookmarks} />}
    </div>
  );
};

export default Bookmarks;
