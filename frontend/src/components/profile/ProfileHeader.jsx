import { Mail } from "lucide-react";
import styles from "./ProfileHeader.module.css";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { useEffect } from "react";

const ProfileHeader = ({ user, isMe, isFollowing, toggleFollow }) => {
  const navigate = useNavigate();
  const socket = useSocket();  
  
  useEffect(() => {
    socket.on("chat-id", ({ conversationId }) => {
      navigate(`/chat/${conversationId}`);
    });

    return () => {
      socket.off("chat-id");
    };
  }, []);

  const handleMessage = () => {
    socket.emit("start-chat", { receiverId: user.user_id });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.username}>{user.username}</p>
      </div>

      <div className={styles.profileHeader} />

      <div className={styles.topRow}>
        <div className={styles.profileImage} />

        <div>
          {!isMe && <Mail onClick={handleMessage} />}

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
