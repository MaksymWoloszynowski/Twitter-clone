import { useEffect, useState } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import ProfilesList from "../components/ProfilesList";
import styles from "./Follows.module.css";

const Follows = () => {
  const { profileId, followType } = useParams();
  const navigate = useNavigate();

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const feedType = followType || "followers";

  const fetchProfiles = async (feed) => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/users/${profileId}/${feed}`);
      setProfiles(res.data);
      if (feed !== feedType) {
        navigate(`/profile/${profileId}/${feed}`);
      }
    } catch (err) {
      setError(err.message);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles(feedType);
  }, [profileId, feedType]);

  return (
    <div className={styles.container}>
      <nav className={styles.tabs}>
        <button
          onClick={() => fetchProfiles("followers")}
          className={feedType === "followers" ? styles.active : ""}
        >
          Followers
        </button>
        <button
          onClick={() => fetchProfiles("following")}
          className={feedType === "following" ? styles.active : ""}
        >
          Following
        </button>
      </nav>

      {loading && <p>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && <ProfilesList profiles={profiles} />}
    </div>
  );
};

export default Follows;
