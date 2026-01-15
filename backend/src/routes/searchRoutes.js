import { Router } from "express";
import searchController from "../controllers/searchController.js";
import authenticateToken from "../middleware/auth.js";

const router = Router();

router.get("/search", authenticateToken, searchController.search);

export default router;