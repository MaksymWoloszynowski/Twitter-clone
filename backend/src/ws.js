import { pool } from "./db.js";

export const handleSocketConnection = (io, socket) => {
  const userId = socket.user.id;

  socket.join(`user:${userId}`);

  socket.on("start-chat", async ({ receiverId }) => {
    try {
      const existing = await pool.query(
        `SELECT cm1.conversation_id
            FROM conversation_members cm1
            JOIN conversation_members cm2 ON cm1.conversation_id = cm2.conversation_id
            WHERE cm1.user_id = $1 AND cm2.user_id = $2
            LIMIT 1`,
        [userId, receiverId]
      );

      let conversationId;

      if (existing.rowCount === 0) {
        const newConversation = await pool.query(
          `INSERT INTO conversations DEFAULT VALUES RETURNING id`
        );

        conversationId = newConversation.rows[0].id;

        await pool.query(
          `INSERT INTO conversation_members (conversation_id, user_id)
         VALUES ($1, $2), ($1, $3)`,
          [conversationId, socket.user.id, receiverId]
        );
      } else {
        conversationId = existing.rows[0].conversation_id;
      }

      socket.join(`conversation:${conversationId}`);

      socket.emit("chat-id", { conversationId });
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("join-conversation", async ({ conversationId }) => {
    const member = await pool.query(
      `SELECT 1 FROM conversation_members
     WHERE conversation_id = $1 AND user_id = $2`,
      [conversationId, userId]
    );

    if (member.rowCount === 0) {
      socket.emit("error");
      return;
    }

    socket.join(`conversation:${conversationId}`);

    await pool.query(
      `UPDATE messages SET read = true WHERE conversation_id = $1 AND receiver_id = $2`,
      [conversationId, socket.user.id]
    );

    const history = await pool.query(
      `SELECT id, sender_id, content, created_at, read
     FROM messages
     WHERE conversation_id = $1
     ORDER BY created_at ASC`,
      [conversationId]
    );

    socket.emit("chat-history", history.rows);
  });

  socket.on("get-contacts", async () => {
    try {
      const contacts = await pool.query(
        `SELECT 
          cm2.user_id,
          u.username,
          (SELECT m.content FROM messages m WHERE m.conversation_id = cm1.conversation_id ORDER BY m.created_at DESC LIMIT 1) AS last_message,
          (SELECT m.read FROM messages m WHERE m.conversation_id = cm1.conversation_id ORDER BY m.created_at DESC LIMIT 1) AS last_read,
          (SELECT m.created_at FROM messages m WHERE m.conversation_id = cm1.conversation_id ORDER BY m.created_at DESC LIMIT 1) AS created_at,
          (SELECT COUNT(*) FROM messages m WHERE m.conversation_id = cm1.conversation_id AND m.read = false ) AS unread_count
        FROM conversation_members cm1
        JOIN conversation_members cm2 
            ON cm1.conversation_id = cm2.conversation_id
        JOIN users u ON u.id = cm2.user_id
        WHERE cm1.user_id = $1 
          AND cm2.user_id != $1
        ORDER BY created_at DESC;`,
        [socket.user.id]
      );

      const filteredContacts = contacts.rows.filter(m => m.last_message !== null)

      socket.emit("contacts", filteredContacts);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("send-message", async ({ conversationId, content }) => {
    try {
      const receiver = await pool.query(
        `SELECT user_id
        FROM conversation_members
        WHERE conversation_id = $1 AND user_id != $2`,
        [conversationId, socket.user.id]
      );

      const receiverId = receiver.rows[0].user_id;

      const sockets = io.sockets.adapter.rooms.get(
        `conversation:${conversationId}`
      );

      const read = sockets.size === 2;

      console.log(sockets);

      await pool.query(
        `INSERT INTO messages (conversation_id, sender_id, receiver_id, content, read)
         VALUES ($1, $2, $3, $4, $5)`,
        [conversationId, socket.user.id, receiverId, content, read]
      );

      io.to(`conversation:${conversationId}`).emit("new-message", {
        sender_id: userId,
        receiver_id: receiverId,
        content,
        created_at: new Date(),
        read,
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnect", userId, reason);
  });

  socket.on("leave-conversation", ({ conversationId }) => {
    socket.leave(`conversation:${conversationId}`);
  });
};
