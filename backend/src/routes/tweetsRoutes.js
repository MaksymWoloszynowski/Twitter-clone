import { Router } from "express";
import tweetsController from "../controllers/tweetsController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/tweets", authenticateToken, tweetsController.getAllTweets);
router.get("/tweets/following", authenticateToken, tweetsController.getAllFollowingTweets);
router.get("/tweets/:id", authenticateToken, tweetsController.getTweet);
router.get("/tweets/:id/comments", authenticateToken, tweetsController.getTweetComments);

router.post("/tweets/create", authenticateToken, tweetsController.createTweet);
router.post("/tweets/:id/comments", authenticateToken, tweetsController.createComment);
router.post("/tweets/:id/like", authenticateToken, tweetsController.likeTweet);

router.put("/tweets/:id", authenticateToken, tweetsController.editTweet);
router.put("/tweets/:id/comments/:commentId", authenticateToken, tweetsController.editComment);

router.delete("/tweets/:id", authenticateToken, tweetsController.deleteTweet);
router.delete("/tweets/:id/comments/:commentId", authenticateToken, tweetsController.deleteComment);
router.delete("/tweets/:id/like", authenticateToken, tweetsController.unlikeTweet);

export default router;