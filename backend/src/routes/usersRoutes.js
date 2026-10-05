import { Router } from "express";
import userController from "../controllers/usersController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/users/:username", authenticateToken, userController.getUserProfile);
router.get("/users/:username/following", authenticateToken, userController.getUserFollowing);
router.get("/users/:username/followers", authenticateToken, userController.getUserFollowers);
router.get("/users/:username/bookmarks", authenticateToken, userController.getBookmarks)

router.post("/users/:username/followers", authenticateToken, userController.followUser);
router.delete("/users/:username/followers", authenticateToken, userController.unfollowUser);

router.put("/users/:username", authenticateToken, userController.editUserProfile);
router.delete("/users/me", authenticateToken, userController.deleteUser);

export default router;