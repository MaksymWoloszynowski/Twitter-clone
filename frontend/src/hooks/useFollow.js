import { useEffect, useState } from "react";
import api from "../api/api";

const useFollow = ({ user }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    if (!user) return;

    setIsFollowing(user.followed_by_me);
    setFollowers(Number(user.followers_count));
  }, [user?.id]);

  const toggleFollow = async () => {
    setIsFollowing((prev) => !prev);
    setFollowers((prev) => prev + (!isFollowing ? 1 : -1));
    try {
      if (isFollowing) {
        await api.delete(`/users/${user.username}/follow`);
      } else {
        await api.post(`/users/${user.username}/follow`);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return {
    isFollowing,
    followers,
    toggleFollow,
  };
};

export default useFollow;
