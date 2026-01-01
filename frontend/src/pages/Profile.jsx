import { useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileTweetList from "../components/profile/ProfileTweetList";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { profileId } = useParams();
  const { auth } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${profileId}`);
        setUserInfo(res.data.userInfo);
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
  if (!userInfo) return <p>User not found</p>;

  return (
    <div>
      <ProfileHeader
        user={userInfo}
        profileId={profileId}
        isMe={auth?.id === userInfo.user_id}
      />
      <ProfileStats user={userInfo} />
      <ProfileTweetList tweets={userTweets} />
    </div>
  );
};

export default Profile;
