import { useEffect, useState } from "react";
import api from "../api/api";
import TweetCard from "./TweetCard";

const TweetList = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const res = await api.get("/tweets");
      setTweets(res.data);
      
    };
    fetchTweets();
  }, []);

  return (
    <div>
      {tweets.map(tweet => {
        console.log(tweet)
        return <TweetCard key={tweet.id} tweet={tweet} />
})}
    </div>
  );
}

export default TweetList;