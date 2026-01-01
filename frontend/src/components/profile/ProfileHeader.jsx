import { useState } from "react";
import styles from "./ProfileHeader.module.css";
import api from "../../api/api";

const ProfileHeader = ({ user, profileId, isMe }) => {
  const [isFollowing, setIsFollowing] = useState(user.followed_by_me);

  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/users/${profileId}/follow`);
        setIsFollowing(false)
      } else {
        await api.post(`/users/${profileId}/follow`);
        setIsFollowing(true)
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.username}>{user.username}</p>
      </div>

      <div className={styles.profileHeader} />

      <div className={styles.topRow}>
        <div className={styles.profileImage} />

        {!isMe && (
          <button
            className={`${styles.followBtn} ${
              isFollowing ? styles.following : ""
            }`}
            onClick={toggleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>

      <div className={styles.profileInfo}>
        <p className={styles.username}>{user.username}</p>
        <p className={styles.handle}>@{user.username}</p>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
      </div>
    </div>
  );
};

export default ProfileHeader;
