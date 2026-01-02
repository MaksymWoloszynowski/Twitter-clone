import styles from "./ProfileHeader.module.css";

const ProfileHeader = ({ user, isMe, isFollowing, toggleFollow }) => {
  
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
