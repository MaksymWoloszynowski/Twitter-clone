import { useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileTweetList from "../components/profile/ProfileTweetList";
import useAuth from "../hooks/useAuth";
import useFollow from "../hooks/useFollow";

const Profile = () => {
  const { profileId } = useParams();
  const { auth } = useAuth();

  const [user, setUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { isFollowing, followers, toggleFollow } = useFollow({ user });  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${profileId}`);
        setUser(res.data.userInfo);
        setUserTweets(res.data.userTweets);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [profileId]);

  if (loading) return <p>Loading profile…</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div>
      <ProfileHeader
        user={user}
        profileId={profileId}
        isMe={auth?.id === user.user_id}
        isFollowing={isFollowing}
        toggleFollow={toggleFollow}
      />
      <ProfileStats user={user} followers={followers} />
      <ProfileTweetList tweets={userTweets} />
    </div>
  );
};

export default Profile;
