import styles from "./ProfileStats.module.css";
import { Link } from "react-router-dom";
import useFollow from "../../hooks/useFollow";

const ProfileStats = ({ user }) => {
  const { followers } = useFollow(user);

  return (
    <div className={styles.stats}>
      <Link to={`/profile/${user.username}/following`} className={styles.stat}>
        <span className={styles.thick}>{user.following_count}</span>{" "}
        Following
      </Link>
      <Link to={`/profile/${user.username}/followers`} className={styles.stat}>
        <span className={styles.thick}>{followers}</span> Followers
      </Link>
    </div>
  );
};

export default ProfileStats;
