import { Router } from "express";
import { createTodoController, deleteTodoController, updateTodoController } from "../controller/todo.controller";

const router = Router();

router.post("/create", createTodoController);
router.put("/update/:id", updateTodoController);
router.delete("/delete/:id", deleteTodoController);

export default router;
