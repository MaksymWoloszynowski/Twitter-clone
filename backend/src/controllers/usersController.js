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
      userTweets: userTweetsResult.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

const getUserFollowing = async (req, res) => {
  const username = req.params.username;

  try {
    const userExists = await pool.query(
      `SELECT * FROM users WHERE username = $1`,[username]
    )

    if (userExists.rowCount === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    const userFollowing = await pool.query(
      `SELECT 
        u_followed.id,
        u_followed.username,
        u_followed.bio
      FROM users u
      JOIN follows f ON f.follower_id = u.id
      JOIN users u_followed ON u_followed.id = f.following_id
      WHERE u.username = $1`,
      [username]
    );

    res.status(200).json(userFollowing.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user following" });
  }
};

const getUserFollowers = async (req, res) => {
  const username = req.params.username;

  try {
    const userFollowers = await pool.query(
      `SELECT 
        u_follower.id,
        u_follower.username,
        u_follower.bio
      FROM users u
      JOIN follows f ON f.following_id = u.id
      JOIN users u_follower ON u_follower.id = f.follower_id
      WHERE u.username = $1`,
      [username]
    );

    res.status(200).json(userFollowers.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user followers" });
  }
};

const followUser = async (req, res) => {
  const { username } = req.params;
  const userID = req.user.id;

  try {
    const userToFollowResult = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );

    if (userToFollowResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userToFollowID = userToFollowResult.rows[0].id;

    if (userToFollowID === userID) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    const alreadyFollows = await pool.query(
      `SELECT 1 FROM follows WHERE follower_id = $1 AND following_id = $2`,
      [userID, userToFollowID]
    );

    if (alreadyFollows.rowCount > 0) {
      return res.status(400).json({ error: "User already followed" });
    }

    await pool.query(
      `INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)`,
      [userID, userToFollowID]
    );

    res.status(201).json({ message: "Successfully followed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to follow profile" });
  }
};

const unfollowUser = async (req, res) => {
  const { username } = req.params;
  const userID = req.user.id;

  try {
    const userResult = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userToUnfollowID = userResult.rows[0].id;

    if (userToUnfollowID === userID) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    const result = await pool.query(
      `DELETE FROM follows 
       WHERE follower_id = $1 AND following_id = $2`,
      [userID, userToUnfollowID]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "You are not following this user" });
    }

    res.status(200).json({ message: "Successfully unfollowed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to unfollow profile" });
  }
};

const editUserProfile = async (req, res) => {
  const { username } = req.params;
  const { newUsername, newBio } = req.body;
  const userID = req.user.id;

  try {
    const userResult = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userToEditID = userResult.rows[0].id;

    if (userID !== userToEditID) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!newUsername || newUsername.trim() === "") {
      return res.status(400).json({ error: "Username cannot be empty" });
    }

    // Sprawdzenie, czy nowy username jest już zajęty
    const existingUser = await pool.query(
      `SELECT id FROM users WHERE username = $1 AND id != $2`,
      [newUsername, userID]
    );
    if (existingUser.rowCount > 0) {
      return res.status(400).json({ error: "Username already taken" });
    }

    await pool.query(
      `UPDATE users
       SET username = $1, bio = $2
       WHERE id = $3`,
      [newUsername, newBio || "", userID]
    );

    res.status(200).json({ message: "Successfully updated your profile" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  const loggedUser = req.user;

  try {
    const userResult = await pool.query(
      `SELECT id FROM users WHERE username = $1`,
      [username]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const userToDeleteID = userResult.rows[0].id;

    const isAdmin = loggedUser.role === "admin";
    const isOwner = loggedUser.id === userToDeleteID;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await pool.query(`DELETE FROM users WHERE id = $1`, [userToDeleteID]);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete profile" });
  }
};

export default {
  getUserProfile,
  getUserFollowing,
  getUserFollowers,
  followUser,
  unfollowUser,
  editUserProfile,
  deleteUser,
};
