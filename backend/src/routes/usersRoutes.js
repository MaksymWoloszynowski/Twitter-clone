import { Router } from "express";
import userController from "../controllers/usersController.js";

const router = Router();

router.get("/users/:username", userController.getUserProfile);
router.get("/users/:username/following", userController.getUserFollowing);
router.get("/users/:username/followers", userController.getUserFollowers);

router.post("/users/:username/follow", userController.followUser);
router.delete("/users/:username/follow", userController.unfollowUser);

router.put("/users/:username", userController.editUserProfile);
router.delete("/users/:username", userController.deleteUser);

export default router;