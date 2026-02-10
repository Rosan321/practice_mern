import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import connectDB from "./config/database.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",  // or you can use true to allow all origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

export default app;
