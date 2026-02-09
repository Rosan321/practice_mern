import { Router } from "express";
import { createTodoController, deleteTodoController, getTodosController, updateTodoController } from "../controller/todo.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

// router.use(protect);

router.get("/", protect, getTodosController);
router.post("/create", protect, createTodoController);
router.put("/update/:id", protect, updateTodoController);    // this is common pattern 
// router.put("/:id", updateTodoController);        // This is more descriptive and clear and simple (Recomended)
// router.delete("/:id", deleteTodoController);
router.delete("/delete/:id", protect, deleteTodoController);

export default router;
