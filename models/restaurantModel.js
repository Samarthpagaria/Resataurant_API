import mongoose from "mongoose";

// Define the Restaurant schema
const restaurantSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Restaurant title is required"],
    },
    imageUrl: {
      type: String,
    },
    foods: {
      type: Array, // Consider referencing Food models if applicable
    },
    time: {
      type: String,
    },
    pickUp: {
      type: Boolean,
      default: true,
    },
    delivery: {
      type: Boolean,
      default: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    logoUrl: {
      type: String,
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String, // Ensure this is correct; typically, you'd expect a Number here
    },
    code: {
      type: String,
    },
    coords: {
      id: {
        type: String,
      },
      latitude: {
        type: Number,
      },
      latitudeDELTA: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
      longitudeDELTA: {
        type: Number,
      },
      address: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

// Export the Restaurant model using ES6 export syntax
export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
