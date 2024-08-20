import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createRestaurant,
  deleteRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
} from "../controllers/restaurantController.js";

const router = express.Router();
router.post("/create", authMiddleware, createRestaurant);

//get all restaurants
router.get("/getAll", getAllRestaurantController);

//get single restaurant
router.get("/get/:id", getRestaurantByIdController);

//delete restaurant
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

export { router };
