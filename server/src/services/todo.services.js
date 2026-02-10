import Todo from "../models/todo.model.js";

export const createTodo = async (title) => {
  return await Todo.create({ title });
};

export const getTodo = async () => {
  return await Todo.find();
};

export const updateTodo = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodo = async (id) => {
  return await Todo.findOneAndDelete(id);
};
