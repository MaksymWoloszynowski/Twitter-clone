import styles from "./ProfileCard.module.css";
import useAuth from "../../hooks/useAuth";
import useFollow from "../../hooks/useFollow";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate()
  const { auth } = useAuth();
  const {isFollowing, toggleFollow} = useFollow(profile)

  const isMe = profile.id === auth.id;

  const handleClick = () => {
    navigate(`/profile/${profile.username}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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
