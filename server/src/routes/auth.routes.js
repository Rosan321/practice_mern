import { Router } from "express";
import { login, refreshAccessToken, register } from "../controller/auth.controller.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/refresh", refreshAccessToken);

export default router;

