import Todo from "../models/todo.model"

export const createTodo = async (title) => {
    return await Todo.create({ title });
};

export const getAllTodo = async () => {
    return await Todo.find();
};

export const updateTodo = async (id, data) => {
    return await Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodo = async (id) => {
    return await Todo.findOneAndDelete(id);
};

