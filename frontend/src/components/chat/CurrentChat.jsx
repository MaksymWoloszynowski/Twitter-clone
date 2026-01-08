import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../hooks/useSocket";
import styles from "./CurrentChat.module.css";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ChatMessage from "./ChatMessage";

const CurrentChat = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const socket = useSocket();
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("join-conversation", {conversationId: id})

    socket.on("chat-history", (history) => {        
      setChatHistory(history);
    });

    socket.on("new-message", (msg) => {
        console.log(msg);
        
      setChatHistory((prev) => [...prev, msg]);
    });

    socket.on("error", () => {
      navigate("/chat");
    });

    return () => {
      socket.off("chat-history");
      socket.off("new-message");
    };
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("send-message", { conversationId: id, content: message });
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {chatHistory.map((msg) => {
          const isMe = msg.sender_id === auth.id;
          return (
            <ChatMessage key={msg.id} isMe={isMe} content={msg.content} createdAt={msg.created_at} />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className={styles.inputForm}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.messageBtn} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default CurrentChat;
