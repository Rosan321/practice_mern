import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // 🔹 Fetch Todos (READ)
  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("todos");
      setTodos(res.data.todos);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Add Todo (CREATE)
  const addTodo = async () => {
    if (!title.trim()) return;

    try {
      const res = await axiosInstance.post(`todos/create`, { title });
      alert(res.data.message);
      setTodos([...todos, res.data.newTodo]);
      setTitle("");
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  // 🔹 Delete Todo (DELETE)
  const deleteTodo = async (id) => {
    const isConfirmed = confirm("Are you sure you want to delete this todo?");
    if (!isConfirmed) return; // stop if user cancels
    try {
      const res = await axiosInstance.delete(`todos/delete/${id}`);
      alert(res.data.message);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  // 🔹 Update Todo (EDIT)
  const updateTodo = async (id) => {
    if (!editingTitle.trim()) return;

    const isConfirmed = confirm("Are you sure you want to edit this todo?");
    if (!isConfirmed) return; // stop if user cancels

    try {
      const res = await axiosInstance.put(`todos/update/${id}`, {
        title: editingTitle,
      });

      alert(res.data.message);

      setTodos(todos.map((todo) => (todo._id === id ? res.data.todo : todo)));

      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Error updating todo", err);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Make your Todo List
        </h2>

        {/* Add Todo */}
        <div className="flex mb-6 gap-2">
          <input
            type="text"
            placeholder="Enter todo..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-4">
          {todos.map((todo) => (
            <li key={todo._id} className="p-4 bg-gray-50 rounded-md shadow-sm">
              {editingId === todo._id ? (
                <div className="flex flex-1 gap-2">
                  <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="text-green-500 hover:text-green-600 transition"
                  >
                    {/* Save Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-red-500 hover:text-red-600 transition"
                  >
                    {/* Cancel Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {todo.title}
                    </h4>
                    <p className="text-sm text-gray-500">{todo.status}</p>
                  </div>
                  <div className="flex gap-2 justify-end mt-2">
                    <button
                      onClick={() => {
                        setEditingId(todo._id);
                        setEditingTitle(todo.title);
                      }}
                      className="text-blue-500 hover:text-blue-600 transition"
                    >
                      {/* Edit Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L12 14l-4 1 1-4 7.5-7.5z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      {/* Delete Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
