import express from "express";
import { food } from "../models/foodModel.js";
import { order } from "../models/orderModel.js";

// Create Food Controller: Handles the creation of a new food item
const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    // Validate required fields
    if (!title || !description || !price || !restaurant) {
      return res.status(400).send({
        success: false,
        message: "Please provide required fields.",
      });
    }

    // Create a new food item with the provided data
    const newFood = new food({
      title,
      description,
      price,
      imageURL,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurant,
      rating,
    });

    // Save the food item to the database
    await newFood.save();

    // Respond with success if the food item is created
    res.status(201).send({
      success: true,
      message: "New food item created",
      newFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create food API",
      error,
    });
  }
};

// Get All Food Controller: Retrieves all food items from the database
const getAllFoodController = async (req, res) => {
  try {
    // Fetch all food items from the database
    const foods = await food.find({});

    // Check if any food items were found
    if (!foods || foods.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No food items found",
      });
    }

    // Respond with the list of food items
    res.status(200).send({
      success: true,
      message: "Food items retrieved successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all food API",
      error,
    });
  }
};

// Get Single Food Controller: Retrieves a specific food item by its ID
const getSingleFoodController = async (req, res) => {
  try {
    // Extract the food ID from the request parameters
    const { id } = req.params;

    // Fetch the food item by its ID
    const singleFood = await food.findById(id);

    // Check if the food item was found
    if (!singleFood) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    // Respond with the found food item
    res.status(200).send({
      success: true,
      message: "Food item retrieved successfully",
      data: singleFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get single food API",
      error,
    });
  }
};

// Update Food Controller: Updates a food item by its ID
const updatefoodItemController = async (req, res) => {
  try {
    // Extract the food ID and update data from the request
    const { id } = req.params;
    const updateData = req.body;

    // Validate input
    if (!id || !updateData) {
      return res.status(400).send({
        success: false,
        message: "ID and update data are required",
      });
    }

    // Find and update the food item by ID
    const updatedFood = await food.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
    });

    // Check if the food item was found and updated
    if (!updatedFood) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    // Respond with the updated food item
    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in update food API",
      error,
    });
  }
};

// Delete Food Controller: Deletes a food item by its ID
const deleteFoodItemController = async (req, res) => {
  try {
    // Extract the food ID from the request parameters
    const { id } = req.params;

    // Find and delete the food item by ID
    const deletedFood = await food.findByIdAndDelete(id);

    // Check if the food item was found and deleted
    if (!deletedFood) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    // Respond with success if the food item was deleted
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete food API",
      error,
    });
  }
};

// Place Order Controller: Handles placing an order
const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;

    // Validate that the cart is not empty
    if (!cart || cart.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Please add items to the cart",
      });
    }

    let total = 0;

    // Calculate the total price of the items in the cart
    cart.forEach((item) => {
      total += item.price;
    });

    // Create a new order
    const newOrder = new order({
      foods: cart,
      payment,
      buyer: req.body.id, // Ensure this is correctly obtained from your request
      total, // Store the total amount in the order
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success if the order is placed
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
      error,
    });
  }
};

// Order Status Controller: Updates the status of an order
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Validate that the order ID and status are provided
    if (!orderId || !status) {
      return res.status(400).send({
        success: false,
        message: "Please provide a valid order ID and status",
      });
    }

    // Find and update the order status by ID
    const updatedOrder = await order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      return res.status(404).send({
        success: false,
        message: "Order not found",
      });
    }

    // Respond with success if the order status was updated
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in order status API",
      error,
    });
  }
};

// Export the controllers for use in routes
export {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  updatefoodItemController,
  deleteFoodItemController,
  placeOrderController,
  orderStatusController,
};
