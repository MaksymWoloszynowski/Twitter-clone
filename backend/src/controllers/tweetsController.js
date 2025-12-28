import { pool } from "../db.js";

const getAllTweets = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         tweets.id,
         tweets.content,
         tweets.created_at,
         users.username,
         (SELECT COUNT(*) FROM comments WHERE comments.tweet_id = tweets.id) AS comment_count,
         (SELECT COUNT(*) FROM likes WHERE likes.tweet_id = tweets.id) AS like_count
       FROM tweets
       JOIN users ON tweets.user_id = users.id
       ORDER BY tweets.created_at DESC`
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch tweets" });
  }
};

const getAllFollowingTweets = async (req, res) => {
};

const getTweet = async (req, res) => {
  const tweetId = req.params.id;
  try {
    const result = await pool.query(
      `SELECT 
         tweets.id,
         tweets.content,
         tweets.created_at,
         users.username,
         (SELECT COUNT(*) FROM comments WHERE comments.tweet_id = tweets.id) AS comment_count,
         (SELECT COUNT(*) FROM likes WHERE likes.tweet_id = tweets.id) AS like_count
       FROM tweets
       JOIN users ON tweets.user_id = users.id
       WHERE tweets.id = $1`,
      [tweetId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tweet" });
  }
};

const getTweetComments = async (req, res) => {
  const tweet_id = req.params.id;
  try {
    const result = await pool.query(
      `SELECT 
         comments.id AS comment_id,
         comments.content,
         comments.created_at,
         users.username,
         users.id AS user_id
       FROM comments
       JOIN users ON comments.user_id = users.id
       WHERE comments.tweet_id = $1
       ORDER BY comments.created_at DESC`,
      [tweet_id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const createTweet = async (req, res) => {
  const tweet_content = req.body.content;

  try {
    const result = await pool.query(
      `INSERT INTO tweets (user_id, content)
       VALUES ($1, $2)`,
      [tweet_content]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post tweet" });
  }
};

const createComment = async (req, res) => {
  
};

const likeTweet = async (req, res) => {

};

const unlikeTweet = async (req, res) => {

};

const deleteTweet = async (req, res) => {
  const tweet_id = req.params.id;

  try {
    const result = await pool.query(`DELETE FROM tweets WHERE tweets.id = $1`, [
      tweet_id
    ]);

    res.status(200).json({ error: "Successfully deleted tweet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post tweet" });
  }
};

export default {
  getAllTweets,
  getAllFollowingTweets,
  getTweet,
  getTweetComments,
  createTweet,
  createComment,
  likeTweet,
  unlikeTweet,
  deleteTweet,
};
