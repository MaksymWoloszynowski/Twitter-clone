import styles from "./ChatMessage.module.css";
import { Check } from "lucide-react";
import { CheckCheck } from "lucide-react";

const ChatMessage = ({ isMe, msg }) => {
  return (
    <div
      className={`${styles.message} ${
        isMe ? styles.myMessage : styles.otherMessage
      }`}
    >
      <p>{msg.content}</p>
      <div className={styles.data}>
        <p>
          {new Date(msg.created_at).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
        </p>
        {isMe &&
          (msg.read ? (
            <CheckCheck className={styles.check} />
          ) : (
            <Check className={styles.check} />
          ))}
      </div>
    </div>
  );
};

export default ChatMessage;
