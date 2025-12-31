import { useState } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetList from "../components/TweetList";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

export default function Home() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div>
      <div>
        <button onClick={signOut}>Sign Out</button>
      </div>
      <CreateTweet />
      <TweetList />
    </div>
  );
}
