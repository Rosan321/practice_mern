import Todo from "../models/todo.model.js";

export const createTodo = async (todoData) => {
  return await Todo.create(todoData);
};

export const getTodo = async (userId) => {
  return await Todo.find({ userId });
};

export const updateTodo = async (id, data, userId) => {
  return await Todo.findOneAndUpdate(
    { _id: id, userId },
    data,
    { new: true }
  );
};

export const deleteTodo = async (id, userId) => {
  return await Todo.findOneAndDelete({ _id: id, userId });
};
