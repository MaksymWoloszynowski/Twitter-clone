import { useParams } from "react-router-dom";

const Tweet = () => {
  const { tweetId } = useParams();

  console.log(tweetId);

  return <div>Tweet: {tweetId}</div>;
};

export default Tweet;
