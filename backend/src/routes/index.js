import { Router } from "express";
import usersRouter from "./usersRoutes.js"
import tweetsRoutes from "./tweetsRoutes.js"

const router = Router();

router.use(usersRouter)
router.use(tweetsRoutes)

export default router;