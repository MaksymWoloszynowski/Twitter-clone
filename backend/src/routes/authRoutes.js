import { Router } from "express";
import authController from "../controllers/authController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router()

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.post('/auth/logout', authController.logout)
router.get('/auth/me', authenticateToken, authController.me)

export default router