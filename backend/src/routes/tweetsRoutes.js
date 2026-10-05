import { Router } from "express";
import tweetsController from "../controllers/tweetsController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/tweets", authenticateToken, tweetsController.getAllTweets);
router.get("/tweets/following", authenticateToken, tweetsController.getAllFollowingTweets);

router.get("/tweets/:id", authenticateToken, tweetsController.getTweet);
router.post("/tweets", authenticateToken, tweetsController.createTweet);
router.put("/tweets/:id", authenticateToken, tweetsController.editTweet);
router.delete("/tweets/:id", authenticateToken, tweetsController.deleteTweet);

router.get("/tweets/:id/comments", authenticateToken, tweetsController.getTweetComments);
router.post("/tweets/:id/comments", authenticateToken, tweetsController.createComment);

router.put("/tweets/:id/comments", authenticateToken, tweetsController.editComment);
router.delete("/tweets/:id/comments", authenticateToken, tweetsController.deleteComment);

router.post("/tweets/:id/likes", authenticateToken, tweetsController.likeTweet);
router.delete("/tweets/:id/likes", authenticateToken, tweetsController.unlikeTweet);

router.post("/tweets/:id/bookmarks", authenticateToken, tweetsController.createBookmark);
router.delete("/tweets/:id/bookmarks", authenticateToken, tweetsController.deleteBookmark);

export default router;
