import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectdb } from "./config/db.js";
import { router as authRoutes } from "./routes/authRoutes.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as restaurantRoutes } from "./routes/restaurantRoutes.js";
import { router as categoryRoutes } from "./routes/categoryRoutes.js";
import { router as foodRoutes } from "./routes/foodRoutes.js";

// Environment configuration
dotenv.config();

// Connect to database
connectdb();

const app = express();
const port = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Use routes

app.use("/restaurant", authRoutes);
app.use("/restaurant", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/category", categoryRoutes);
app.use("/food", foodRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`.bgBlue);
});
