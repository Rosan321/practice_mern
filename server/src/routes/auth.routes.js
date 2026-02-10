import { Router } from "express";
import {
  login,
  refreshAccessToken,
  register,
} from "../controller/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: Rosan
 *               password:
 *                 type: string
 *                 example: Rosan@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

router.post("/refresh", refreshAccessToken);

export default router;
