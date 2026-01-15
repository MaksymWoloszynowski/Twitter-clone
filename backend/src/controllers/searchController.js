// controllers/searchController.js
import { pool } from "../db.js";

const search = async (req, res) => {
  const query = req.query.q?.trim();
  const userId = req.params.id

  if (!query || query.length < 2) {
    return res.status(200).json({ users: [], tweets: [] });
  }

  try {
    const users = await pool.query(
      `SELECT id, username
       FROM users
       WHERE username ILIKE '%' || $1 || '%'
       ORDER BY username
       LIMIT 10`,
      [query]
    );

    const tweets = await pool.query(
      `SELECT 
        t.id AS tweet_id,
        t.content,
        t.created_at,
        u.username,
        (SELECT COUNT(*) FROM likes l WHERE l.tweet_id = t.id) AS like_count,
        (SELECT COUNT(*) FROM comments c WHERE c.tweet_id = t.id) AS comment_count,
        (SELECT COUNT(*) FROM bookmarks b WHERE b.tweet_id = t.id) AS bookmark_count,

        EXISTS (
            SELECT 1 FROM likes l2
            WHERE l2.tweet_id = t.id AND l2.user_id = $1
        ) AS liked_by_me,

        EXISTS (
            SELECT 1 FROM bookmarks b2
            WHERE b2.tweet_id = t.id AND b2.user_id = $1
        ) AS bookmarked_by_me

       FROM tweets t
       JOIN users u ON u.id = t.user_id
       WHERE t.content ILIKE '%' || $2 || '%'
       ORDER BY t.created_at DESC
       LIMIT 20`,
      [userId, query]
    );

    res.status(200).json({
      users: users.rows,
      tweets: tweets.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Search failed" });
  }
};

export default { search };
