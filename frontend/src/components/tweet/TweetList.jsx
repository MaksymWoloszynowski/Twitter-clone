import TweetCard from "./TweetCard";

const TweetList = ({ tweets }) => {
  return (
    <div>
      {tweets.map(tweet => {
        return <TweetCard key={tweet.id} tweet={tweet} />
})}
    </div>
  );
}

export default TweetList;