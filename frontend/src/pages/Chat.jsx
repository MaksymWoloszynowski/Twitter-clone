import ContactsList from "../components/chat/ContactsList.jsx";
import { Outlet } from "react-router-dom";
import styles from "./Chat.module.css";

const Chat = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contacts}>
        <p>Chat</p>
        <ContactsList />
      </div>
      <div className={styles.chatContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Chat;