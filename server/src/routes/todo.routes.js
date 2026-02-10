import { Router } from "express";
import {
  createTodoController,
  deleteTodoController,
  getTodosController,
  updateTodoController,
} from "../controller/todo.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management APIs
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of todos
 */
router.get("/", getTodosController);

/**
 * @swagger
 * /api/todos/create:
 *   post:
 *     summary: Create a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Node.js
 *     responses:
 *       201:
 *         description: Todo created
 */
router.post("/create", createTodoController);

/**
 * @swagger
 * /api/todos/update/{id}:
 *   put:
 *     summary: Update todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated todo
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated
 */
router.put("/update/:id", updateTodoController); // this is common pattern
// router.put("/:id", updateTodoController);        // This is more descriptive and clear and simple (Recomended)
// router.delete("/:id", deleteTodoController);

/**
 * @swagger
 * /api/todos/delete/{id}:
 *   delete:
 *     summary: Delete todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo deleted
 */
router.delete("/delete/:id", deleteTodoController);

export default router;
