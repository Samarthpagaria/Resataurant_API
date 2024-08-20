import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User name is required!"], // Corrected "require" to "required"
    },
    email: {
      type: String,
      required: [true, "Email is required!"], // Corrected "require" to "required"
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"], // Corrected "require" to "required"
    },
    address: {
      type: Array,
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required."], // Corrected "require" to "required"
    },
    userType: {
      type: String,
      required: [true, "User type is required."], // Corrected "require" to "required"
      default: "client", // Setting default as client
      enum: ["client", "admin", "vendor", "driver"], // Enum options for user type
    },
    profile: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXukZao_O4VE-CqwWJZiiE_Kq2yPwfWPDU5A&s",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"], // Corrected "require" to "required"
    },
  },
  { timestamps: true }
);

// Export the User model
export const user = mongoose.model("User", userSchema); // Capitalized "User" for consistency
