import styles from "./ChatMessage.module.css";

const ChatMessage = ({ isMe, content, createdAt }) => {
  return (
    <div
      className={`${styles.message} ${
        isMe ? styles.myMessage : styles.otherMessage
      }`}
    >
      <p>{content}</p>
      <span className={styles.time}>
        {new Date(createdAt).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        })} 
      </span>
    </div>
  );
};

export default ChatMessage;
