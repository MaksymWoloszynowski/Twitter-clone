import styles from "./Contact.module.css";
import useSocket from "../../hooks/useSocket";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Contact = ({ contact, isActive, onClick }) => {
  const socket = useSocket();
  const navigate = useNavigate();

  useEffect(() => {
    const handleChatId = ({ conversationId }) => {
      navigate(`/chat/${conversationId}`);
    };

    socket.on("chat-id", handleChatId);

    return () => {
      socket.off("chat-id", handleChatId);
    };
  }, []);

  const handleClick = () => {
    onClick();
    socket.emit("start-chat", { receiverId: contact.user_id });
  };

  return (
    <div
      className={`${styles.contact} ${isActive ? styles.active : ""}`}
      onClick={handleClick}
    >
      <div className={styles.contactAvatar}></div>
      <div className={styles.contactInfo}>
        <div className={styles.top}>
          <p className={styles.contactName}>{contact.username}</p>
          <p className={styles.createdAt}>
            {contact.created_at
              ? new Date(contact.created_at).toLocaleString("pl-PL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
              : ""}
          </p>
        </div>
        <p className={styles.lastMessage}>{contact.last_message}</p>
      </div>
      {contact.unread_count > 0 && <span className={styles.unread}>{contact.unread_count}</span>}
    </div>
  );
};

export default Contact;