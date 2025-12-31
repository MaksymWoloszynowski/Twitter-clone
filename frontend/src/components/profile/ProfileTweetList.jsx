import TweetCard from "../TweetCard";

const ProfileTweetList = ({ tweets }) => {
  if (tweets.length === 0) {
    return <p>No tweets yet</p>;
  }

  return (
    <section>
      {tweets.map(tweet => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </section>
  );
};

export default ProfileTweetList;