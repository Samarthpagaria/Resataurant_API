import { user as userModel } from "../models/userModel.js"; // Corrected the redundant import of 'user'
import bcrypt from "bcrypt";

// Get user info
const getUserController = async (req, res) => {
  try {
    // Find user by ID
    const user = await userModel.findById(req.body.id);

    // Check if user was found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Hide password before sending the user data
    user.password = undefined;

    // Send the user data back in the response
    res.status(200).send({
      success: true,
      message: "User data retrieved successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user API",
      error,
    });
  }
};

// Update user
const updateUserController = async (req, res) => {
  try {
    // Find user by ID
    const user = await userModel.findById(req.body.id);

    // Validation: Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user fields if provided in the request body
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // Save updated user
    const updatedUser = await user.save();

    // Send updated user data in the response
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in updating the user API",
      error: err,
    });
  }
};

// Reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    // Check if all fields are provided
    if (!email || !newPassword || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Find user by email and security answer
    const user = await userModel.findOne({ email, answer });

    // Check if user is found
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error in resetPasswordController:", error);
    res.status(500).send({
      success: false,
      message: "Error in password reset API",
      error: error.message, // Include the error message
    });
  }
};

// Delete user profile
const deleteProfileController = async (req, res) => {
  try {
    // Find user by ID and delete
    await userModel.findByIdAndDelete(req.params.id);

    // Send a success response
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile API.",
      error,
    });
  }
};

// Exporting all controllers for use in routes
export {
  getUserController,
  updateUserController,
  resetPasswordController,
  deleteProfileController,
};
