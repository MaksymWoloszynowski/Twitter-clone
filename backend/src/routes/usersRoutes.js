import { Router } from "express";
import userController from "../controllers/usersController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/users/:username", userController.getUserProfile);
router.get("/users/:username/following", userController.getUserFollowing);
router.get("/users/:username/followers", userController.getUserFollowers);

router.post("/users/:username/follow", authenticateToken, userController.followUser);
router.delete("/users/:username/follow", authenticateToken, userController.unfollowUser);

router.put("/users/:username/edit", authenticateToken, userController.editUserProfile);
router.delete("/users/:username", authenticateToken, userController.deleteUser);

export default router;