import mongoose from "mongoose";

// Define the Category schema
const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required."], // Validation with a custom error message
    },
    imageURL: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-GSmVcg-WEzO7Cfr6U7tcxBBthzLV6f6cGA&s", // Default image URL if none is provided
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Export the Category model using ES6 export syntax
export const Category = mongoose.model("Category", CategorySchema);
