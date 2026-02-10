import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "../services/todo.services.js";

export const getTodosController = async (req, res) => {
  try {
    const todos = await getTodo();
    if (!todos) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "No Data Found", todos });
    }

    res
      .status(200)
      .json({
        statusCode: 200,
        status: "success",
        message: "Todos retrieved successfully",
        todos,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
};

export const createTodoController = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Title is required" });
    }

    // FIX: pass object, not string
    const newTodo = await createTodo({ title });

    res.status(201).json({
      statusCode: 201,
      status: "success",
      message: "Todo created successfully",
      newTodo,
    });
  } catch (error) {
    console.error("CREATE TODO ERROR:", error);
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
    });
  }
};


export const updateTodoController = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE ID:", req.params.id);
    const { id } = req.params;

    const todo = await updateTodo(id, req.body);
    if (!todo) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Todo not found" });
    }

    res.json({ message: "Todo data updated", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await deleteTodo(id);
    if (!todo) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "Todo not found" });
    }

    res.json({ statusCode: 200, message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
};
