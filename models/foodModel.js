import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"], // Corrected "require" to "required"
    },
    description: {
      type: String,
      required: [true, "Food description is required"], // Corrected "require" to "required"
    },
    price: {
      type: Number,
      required: [true, "Food price is required"], // Corrected "require" to "required"
    },
    imageURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GSmVcg-WEzO7Cfr6U7tcxBBthzLV6f6cGA&s",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailabe: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant", // Assuming you meant to reference a "Restaurant" model, not "Food"
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: Number, // Changed from String to Number assuming it's a count of ratings
      default: 0, // Default to 0 to start counting from 0
    },
  },
  { timestamps: true }
);

// Export the Food model
export const food = mongoose.model("Food", FoodSchema);
