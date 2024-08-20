import express from "express";
import {
  deleteProfileController,
  getUserController,
  resetPasswordController,
  updateUserController,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// ROUTES
// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// Update profile
router.put("/updateUser", authMiddleware, updateUserController);

//reset password
router.post("/resetpassword", authMiddleware, resetPasswordController);

//delete user
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

export { router };
