import { Mail } from "lucide-react";
import styles from "./ProfileHeader.module.css";
import { useNavigate } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import { useEffect } from "react";
import { useState } from "react";
import EditModal from "../edit_profile/EditModal";
import EditProfileForm from "../edit_profile/EditProfileForm";

const ProfileHeader = ({ user, isMe, isFollowing, toggleFollow }) => {
  const navigate = useNavigate();
  const socket = useSocket();  
  const [isEditing, setIsEditing] = useState(false)
  
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

          {isMe && <button className={styles.editButton} onClick={() => setIsEditing(true)}>Edit profile</button>}
        </div>
      </div>

      <div className={styles.profileInfo}>
        <p className={styles.username}>{user.username}</p>
        <p className={styles.handle}>@{user.username}</p>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}
      </div>

      {isEditing && (
        <EditModal onClose={() => setIsEditing(false)}>
          <EditProfileForm onClose={() => setIsEditing(false)} user={user} />
        </EditModal>
      )}
    </div>
  );
};

export default ProfileHeader;
