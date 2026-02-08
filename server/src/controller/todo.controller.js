import { createTodo, deleteTodo, updateTodo } from "../services/todo.services";

export const createTodoController = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    };

    const newTodo = await createTodo(title);
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTodoController = async (req, res) => {
    try {
    const { id } = req.params;

    const todo = await updateTodo(id, req.body);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await deleteTodo(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
