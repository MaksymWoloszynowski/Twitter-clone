import { useState } from "react";
import api from "../api/api";

export default function CreateTweet({ onTweetCreated }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tweets/create", { content });
      setContent("");
      onTweetCreated();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's happening?" />
      <button type="submit">Tweet</button>
    </form>
  );
}