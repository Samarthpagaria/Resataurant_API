import { user } from "../models/userModel.js"; // Corrected import statement for user model

// Middleware for token verification
const adminMiddleware = async (req, res, next) => {
  try {
    // Find user by ID from request body
    const foundUser = await user.findById(req.body.id);

    // Check if user was found and if user is an admin
    if (!foundUser || foundUser.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only admins can access this resource.",
      });
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized access.",
      error: error.message, // Include the error message
    });
  }
};

// Exporting the middleware using ES6 export syntax
export { adminMiddleware };
