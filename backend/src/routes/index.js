import { Router } from "express";
import usersRouter from "./usersRoutes.js"
import tweetsRouter from "./tweetsRoutes.js"
import authRouter from "./authRoutes.js"
import searchRouter from "./searchRoutes.js"
import healthRouter from "./healthRouter.js"

const router = Router();

router.use(usersRouter)
router.use(tweetsRouter)
router.use(authRouter)
router.use(searchRouter)
router.use(healthRouter)

export default router;