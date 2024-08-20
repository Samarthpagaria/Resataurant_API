import express from "express"; // Importing Express.js to create routes

import { authMiddleware } from "../middleware/authMiddleware.js"; // Middleware to check user authentication
import { adminMiddleware } from "../middleware/adminMiddleware.js"; // Middleware to check if user is an admin

import {
  createFoodController, // Controller to create a new food item
  deleteFoodItemController, // Controller to delete a food item
  getAllFoodController, // Controller to get all food items
  getSingleFoodController, // Controller to get a single food item by ID
  orderStatusController, // Controller to update order status
  placeOrderController, // Controller to place a new order
  updatefoodItemController, // Controller to update a food item
} from "../controllers/foodController.js"; // Importing the controllers

const router = express.Router(); // Creating a new Express router instance

// Route to create a new food item
// Only accessible to authenticated users
router.post("/create", authMiddleware, createFoodController);

// Route to get all food items
// Publicly accessible
router.get("/getAll", getAllFoodController);

// Route to get a single food item by its ID
// Only accessible to authenticated users
router.get("/get/:id", authMiddleware, getSingleFoodController);

// Route to update a food item by its ID
// Only accessible to authenticated users
router.put("/update/:id", authMiddleware, updatefoodItemController);

// Route to delete a food item by its ID
// Only accessible to authenticated users
router.delete("/delete/:id", authMiddleware, deleteFoodItemController);

// Route to place a new order
// Only accessible to authenticated users
router.post("/placeorder", authMiddleware, placeOrderController);

// Route to update the status of an order
// Only accessible to admins
router.post(
  "/orderstatus/:id",
  adminMiddleware,
  authMiddleware,
  orderStatusController
);

// Export the router to use in other parts of the application
export { router };
