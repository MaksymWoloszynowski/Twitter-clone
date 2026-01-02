import TweetCard from "./tweet/TweetCard";

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <TweetCard key={comment.id} tweet={comment} />;
      })}
    </div>
  );
};

export default Comments;
