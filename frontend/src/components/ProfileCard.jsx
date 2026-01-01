import { useState } from "react";
import styles from "./ProfileCard.module.css";
import api from "../api/api";
import useAuth from "../hooks/useAuth";

const ProfileCard = ({ profile }) => {
  const [isFollowing, setIsFollowing] = useState(profile.followed_by_me);
  const { auth } = useAuth();

  const isMe = profile.id === auth.id;

  const toggleFollow = async () => {
    try {
      setIsFollowing((prev) => !prev);
      if (isFollowing) {
        await api.delete(`/users/${profile.username}/follow`);
      } else {
        await api.post(`/users/${profile.username}/follow`);
      }
    } catch (err) {
      console.error(err);
      setIsFollowing(profile.followed_by_me);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileImage}></div>
      <div className={styles.profileInfo}>
        <div className={styles.topRow}>
          <div>
            <p className={styles.username}>{profile.username}</p>
            <p className={styles.handle}>@{profile.username}</p>
          </div>
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
        <div>
          <p className={styles.bio}>{profile.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
