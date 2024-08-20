import mongoose from "mongoose";

// Define the Order schema
const OrderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food", // Reference to the Food model
      },
    ],
    payment: {
      type: Object, // Consider defining a more specific schema if payment structure is known
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "prepared", "on the way", "delivered"], // Possible order statuses
      default: "preparing", // Default status when an order is created
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Order model using ES6 export syntax
export const order = mongoose.model("Order", OrderSchema);
