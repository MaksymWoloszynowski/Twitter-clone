import { pool } from "../db.js";

const getUserProfile = async (req, res) => {
  const username = req.params.username;

  try {
    const userInfoResult = await pool.query(
      `SELECT 
         id AS user_id,
         username,
         bio,
         (SELECT COUNT(*) FROM follows WHERE follower_id = users.id) AS following_count,
         (SELECT COUNT(*) FROM follows WHERE following_id = users.id) AS followers_count
       FROM users
       WHERE username = $1`,
      [username]
    );

    if (!userInfoResult.rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const userInfo = userInfoResult.rows[0];

    const userTweetsResult = await pool.query(
      `SELECT 
         tweets.id AS tweet_id,
         tweets.content,
         tweets.created_at,
         users.username,
         (SELECT COUNT(*) FROM comments WHERE comments.tweet_id = tweets.id) AS comment_count,
         (SELECT COUNT(*) FROM likes WHERE likes.tweet_id = tweets.id) AS like_count
       FROM tweets
       JOIN users ON tweets.user_id = users.id
       WHERE users.username = $1
       ORDER BY tweets.created_at DESC`,
      [username]
    );

    res.status(200).json({
      userInfo,
      userTweets: userTweetsResult.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const getUserFollowing = async (req, res) => {};

const getUserFollowers = async (req, res) => {};

const followUser = async (req, res) => {};
const unfollowUser = async (req, res) => {};

const editUserProfile = async (req, res) => {};

const deleteUser = async (req, res) => {};

export default {
  getUserProfile,
  getUserFollowing,
  getUserFollowers,
  followUser,
  unfollowUser,
  editUserProfile,
  deleteUser,
};
