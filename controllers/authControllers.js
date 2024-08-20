import { user } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register Controller: Handles user registration
const registerControllers = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;

    // Validation: Ensure all required fields are provided
    if (!username || !password || !email || !phone || !address || !answer) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Check if the user already exists in the database
    const existing = await user.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10); // Adjusted salt rounds to a reasonable value
    console.log("Hashed password:", hashedPassword);

    // Create a new user with the provided details
    const newUser = await user.create({
      username,
      password: hashedPassword,
      email,
      phone,
      address,
      answer,
    });

    // Respond with success if the user is successfully registered
    res.status(201).send({
      success: true,
      message: "Successfully registered",
      user: newUser,
    });
  } catch (err) {
    console.log(err);

    // Handle any errors during registration
    res.status(500).send({
      success: false,
      message: "Error in registering API",
      error: err, // Changed to 'error' for consistency
    });
  }
};

// Login Controller: Handles user login
const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation: Ensure both email and password are provided
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if the user exists in the database
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create a JWT token for the authenticated user
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Exclude the password from the response for security reasons
    existingUser.password = undefined;

    // Respond with success if the login is successful
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user: existingUser,
    });
  } catch (error) {
    console.log(error);

    // Handle any errors during login
    res.status(500).send({
      success: false,
      message: "Error in login API",
      error,
    });
  }
};

// Export the controllers for use in routes
export { registerControllers, loginControllers };
