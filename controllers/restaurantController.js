import { Restaurant } from "../models/restaurantModel.js";
import mongoose from "mongoose";

// Create restaurant
const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      rating,
      ratingCount,
      logoUrl,
      isOpen,
      delivery,
      pickUp,
      time,
      foods,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(400).send({
        success: false,
        message: "Please enter title and address",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      rating,
      ratingCount,
      logoUrl,
      isOpen,
      delivery,
      pickUp,
      time,
      foods,
      code,
      coords,
    });

    // Save the new restaurant to the database
    await newRestaurant.save();

    // Send success response
    res.status(201).send({
      success: true,
      message: "New restaurant created successfully",
      data: newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Restaurant API.",
      error,
    });
  }
};

//get all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant  Available",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all restaurant api ",
      error,
    });
  }
};

//get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurat found with this id ",
      });
    }
    //find restaurant
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found with this id",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting restaurant by id API",
      error,
    });
  }
};

//delete restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid restaurant ID",
      });
    }

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found ",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting restaurant api ",
      error,
    });
  }
};
export {
  createRestaurant,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
