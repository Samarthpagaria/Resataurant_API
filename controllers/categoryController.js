import { Category } from "../models/CategoryModel.js";

// Create Category Controller: Handles the creation of a new category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageURL } = req.body;

    // Validation: Ensure the title is provided
    if (!title) {
      return res.status(404).send({
        success: false,
        message: "Please provide Category title.",
      });
    }

    // Create a new category with the provided title and imageURL
    const newCategory = new Category({ title, imageURL });

    // Save the new category to the database
    await newCategory.save();

    // Respond with success if the category is successfully created
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);

    // Handle any errors during category creation
    res.status(500).send({
      success: false,
      message: "Error in Create API.",
      error,
    });
  }
};

// Get All Categories Controller: Retrieves all categories from the database
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});

    // Check if any categories were found
    if (!categories || categories.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    // Respond with success and the list of categories
    res.status(200).send({
      success: true,
      totalCategory: categories.length, // Corrected typo in 'length'
      categories,
    });
  } catch (error) {
    console.log(error);

    // Handle any errors during retrieval of categories
    res.status(500).send({
      success: false,
      message: "Error in getAllCategory API",
      error,
    });
  }
};

// Update Category Controller: Updates an existing category by ID
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const { title, imageURL } = req.body;

    // Find the category by ID and update it with the new title and imageURL
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, imageURL },
      { new: true }
    );

    // Check if the category was found and updated
    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "No Category found",
      });
    }

    // Respond with success if the category is successfully updated
    res.status(200).send({
      success: true,
      message: "Updated Successfully",
      updatedCategory, // Include the updated category in the response
    });
  } catch (error) {
    console.log(error);

    // Handle any errors during the update
    res.status(500).send({
      success: false,
      message: "Error in update API in CategoryController",
      error,
    });
  }
};

// Delete Category Controller: Deletes a category by ID
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters

    // Check if the ID is provided
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "ID not found.",
      });
    }

    // Find the category by ID
    const categoryFound = await Category.findById(id);
    if (!categoryFound) {
      return res.status(404).send({
        success: false,
        message: "No category found in the database.",
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    // Respond with success if the category is successfully deleted
    res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    // Handle any errors during the deletion
    res.status(500).send({
      success: false,
      message: "Error in delete API in CategoryController",
      error,
    });
  }
};

// Export the controllers for use in routes
export {
  createCategoryController,
  getAllCategoryController,
  updateCatController,
  deleteCatController,
};
