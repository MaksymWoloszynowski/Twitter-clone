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
  const userID = req.user.id;

  try {
    const result = await pool.query(
      `SELECT 
         uf.id AS user_id,
         uf.username,
         t.id AS tweet_id,
         t.content,
         t.created_at,
         (SELECT COUNT(*) FROM comments WHERE tweet_id = t.id) AS comment_count,
         (SELECT COUNT(*) FROM likes WHERE tweet_id = t.id) AS like_count
       FROM follows f
       JOIN users uf ON uf.id = f.following_id
       JOIN tweets t ON t.user_id = uf.id
       WHERE f.follower_id = $1
       ORDER BY t.created_at DESC`,
      [userID]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch following tweets" });
  }
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

    if (result.rowCount === 0) {
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
  const { content } = req.body;
  const userID = req.user.id;

  try {
    const result = await pool.query(
      `INSERT INTO tweets (user_id, content) 
   VALUES ($1, $2) 
   RETURNING id, user_id, content, created_at`,
      [userID, content]
    );

    res.status(201).json({ tweet: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post a tweet" });
  }
};

const editTweet = async (req, res) => {
  const tweet_id = req.params.id;
  const userID = req.user.id;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Tweet cannot be empty" });
  }

  try {
    const tweetResult = await pool.query(
      `SELECT user_id FROM tweets WHERE id = $1`,
      [tweet_id]
    );

    if (tweetResult.rowCount === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    if (tweetResult.rows[0].user_id !== userID) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(
      `UPDATE tweets SET content = $1 WHERE id = $2`,
      [content, tweet_id]
    );

    res.status(200).json({ message: "Tweet updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

const createComment = async (req, res) => {
  const tweet_id = req.params.id;
  const userID = req.user.id;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Comment cannot be empty" });
  }

  try {
    const tweetExists = await pool.query(
      `SELECT id FROM tweets WHERE id = $1`,
      [tweet_id]
    );

    if (tweetExists.rowCount === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const result = await pool.query(
      `INSERT INTO comments (tweet_id, user_id, content) 
       VALUES ($1, $2, $3)
       RETURNING id AS comment_id, tweet_id, user_id, content, created_at`,
      [tweet_id, userID, content]
    );

    res.status(201).json({ comment: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post comment" });
  }
};

const editComment = async (req, res) => {
  const comment_id = req.params.commentId;
  const userID = req.user.id;
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Comment cannot be empty" });
  }

  try {
    const commentResult = await pool.query(
      `SELECT user_id FROM comments WHERE id = $1`,
      [comment_id]
    );

    if (commentResult.rowCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    if (commentResult.rows[0].user_id !== userID) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(
      `UPDATE comments SET content = $1 WHERE id = $2`,
      [content, comment_id]
    );

    res.status(200).json({ message: "Comment updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

const deleteComment = async (req, res) => {
  const comment_id = req.params.commentId;
  const loggedUser = req.user;

  try {
    const commentResult = await pool.query(
      `SELECT user_id FROM comments WHERE id = $1`,
      [comment_id]
    );

    if (commentResult.rowCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const isOwner = commentResult.rows[0].user_id === loggedUser.id;
    const isAdmin = loggedUser.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(`DELETE FROM comments WHERE id = $1`, [comment_id]);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};

const likeTweet = async (req, res) => {
  const tweet_id = req.params.id;
  const userID = req.user.id;

  try {
    const alreadyLiked = await pool.query(
      `SELECT 1 FROM likes WHERE user_id = $1 AND tweet_id = $2`,
      [userID, tweet_id]
    );

    if (alreadyLiked.rowCount > 0) {
      return res.status(400).json({ error: "Tweet already liked" });
    }

    await pool.query(`INSERT INTO likes (user_id, tweet_id) VALUES ($1, $2)`, [
      userID,
      tweet_id,
    ]);

    res.status(201).json({ message: "Successfully liked a tweet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to like a tweet" });
  }
};

const unlikeTweet = async (req, res) => {
  const tweet_id = req.params.id;
  const userID = req.user.id;

  try {
    await pool.query(`DELETE FROM likes WHERE user_id = $1 AND tweet_id = $2`, [
      userID,
      tweet_id,
    ]);

    res.status(200).json({ message: "Successfully unliked a tweet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unlike a tweet" });
  }
};

const deleteTweet = async (req, res) => {
  const tweet_id = req.params.id;
  const loggedUser = req.user;

  try {
    const tweetResult = await pool.query(
      `SELECT user_id FROM tweets WHERE id = $1`,
      [tweet_id]
    );

    if (tweetResult.rowCount === 0) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const tweetOwnerID = tweetResult.rows[0].user_id;

    const isAdmin = loggedUser.role === "admin";
    const isOwner = loggedUser.id === tweetOwnerID;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(`DELETE FROM tweets WHERE id = $1`, [tweet_id]);

    res.status(200).json({ message: "Successfully deleted tweet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete tweet" });
  }
};

export default {
  getAllTweets,
  getAllFollowingTweets,
  getTweet,
  getTweetComments,
  createTweet,
  editTweet,
  deleteTweet,
  createComment,
  editComment,
  deleteComment,
  likeTweet,
  unlikeTweet,
};
