import express from "express";
import {
  createCategoryController,
  deleteCatController,
  getAllCategoryController,
  updateCatController,
} from "../controllers/categoryController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

//Routes
//create category
router.post("/create", authMiddleware, createCategoryController);

//Get all Category
router.get("/getAll", getAllCategoryController);

//Update Category
router.put("/update/:id", authMiddleware, updateCatController);

//delete
router.delete("/delete/:id", authMiddleware, deleteCatController);

export { router };
