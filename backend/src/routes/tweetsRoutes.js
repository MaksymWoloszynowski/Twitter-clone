import { Router } from "express";
import tweetsController from "../controllers/tweetsController.js";

const router = Router();

router.get("/tweets", tweetsController.getAllTweets);
router.get("/tweets/following", tweetsController.getAllFollowingTweets);
router.get("/tweets/:id", tweetsController.getTweet);
router.get("/tweets/:id/comments", tweetsController.getTweetComments);

router.post("/tweets", tweetsController.createTweet);
router.post("/tweets/:id/comments", tweetsController.createComment);

router.post("/tweets/:id/likes", tweetsController.likeTweet);
router.delete("/tweets/:id/likes", tweetsController.unlikeTweet);

router.delete("/tweets/:id", tweetsController.deleteTweet);

export default router;