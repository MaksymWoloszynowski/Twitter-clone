import { useEffect, useState } from "react";
import api from "../api/api";

const useLikes = ({ tweet }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  console.log(tweet);

  useEffect(() => {
    if (!tweet) return;

    setLikes(Number(tweet.like_count));
    setLiked(tweet.liked_by_me);
  }, [tweet?.tweet_id]);

  const handleLike = async (e) => {
    e.stopPropagation();

    const wasLiked = liked;

    setLiked(!wasLiked);
    setLikes((prev) => prev + (wasLiked ? -1 : 1));

    try {
      if (!wasLiked) {
        await api.post(`/tweets/${tweet.tweet_id}/like`);
      } else {
        await api.delete(`/tweets/${tweet.tweet_id}/like`);
      }
    } catch (error) {
      setLiked(wasLiked);
      setLikes((prev) => prev + (wasLiked ? 1 : -1));
      console.error(error);
    }
  };

  return {
    likes,
    liked,
    handleLike,
    setLikes,
    setLiked,
  };
};

export default useLikes;
