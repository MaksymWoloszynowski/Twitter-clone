import styles from "./ProfileStats.module.css"
import { Link } from "react-router-dom";

const ProfileStats = ({ user, followers }) => {
  
  return (
    <div className={styles.stats}>
      <Link to={`/profile/${user.username}/following`} className={styles.stat}>
        <strong className={styles.thick}>{user.following_count}</strong> Following
      </Link>
      <Link to={`/profile/${user.username}/followers`} className={styles.stat}>
        <strong className={styles.thick}>{followers}</strong> Followers
      </Link>
    </div>
  );
};

export default ProfileStats;
