import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());


// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api/todos", todoRoutes);

// Home
app.get("/", (req, res) => {
  res.json({ message: "Welcome, API is running" });
});

export default app;
