import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // 🔹 Fetch Todos (READ)
  const fetchTodos = async () => {
    try {
      const res = await axios.get(API_URL);
      setTodos(res.data);
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
      const res = await axios.post(API_URL, { title });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Error adding todo", err);
    }
  };

  // 🔹 Delete Todo (DELETE)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  // 🔹 Update Todo (EDIT)
  const updateTodo = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        title: editingTitle,
      });

      setTodos(
        todos.map((todo) =>
          todo._id === id ? res.data : todo
        )
      );

      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error("Error updating todo", err);
    }
  };

  return (
    <>
      <h2>Welcome to my Home</h2>

      {/* Add Todo */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Todo List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginBottom: "10px" }}>
            {editingId === todo._id ? (
              <>
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={() => updateTodo(todo._id)}>
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <button
                  onClick={() => {
                    setEditingId(todo._id);
                    setEditingTitle(todo.title);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo._id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
