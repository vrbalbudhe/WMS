// Path: Backend/controllers/warehouse/CategoryController.js
const prisma = require("../../lib/prisma");

/**
 * Create a new product category
 * @route POST /api/warehouse/categories
 */
exports.createCategory = async (req, res) => {
  try {
    const { name, description, fields } = req.body;
    
    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    // Get user information from the request (set by auth middleware)
    const userId = req.user.id;
    
    // Create category in database - no warehouse specific association
    const category = await prisma.category.create({
      data: {
        name,
        description,
        fields: fields || {},
        // No warehouseId field - categories are global
        createdByUserId: userId,
        updatedByUserId: userId
      }
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message
    });
  }
};

/**
 * Get all categories
 * @route GET /api/warehouse/categories
 */
exports.getAllCategories = async (req, res) => {
  try {
    // Fetch all categories without warehouse filtering
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message
    });
  }
};

/**
 * Get one category by ID
 * @route GET /api/warehouse/categories/:id
 */
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format"
      });
    }
    
    // Fetch category
    const category = await prisma.category.findUnique({
      where: { id }
    });
    
    // Check if category exists
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch category",
      error: error.message
    });
  }
};

/**
 * Update a category
 * @route PUT /api/warehouse/categories/:id
 */
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, fields } = req.body;
    
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format"
      });
    }
    
    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id }
    });
    
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    // Get user information from the request (set by auth middleware)
    const userId = req.user.id;
    
    // Update category
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        fields: fields || categoryExists.fields,
        // No warehouseId update - categories are global
        updatedByUserId: userId
      }
    });
    
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message
    });
  }
};

/**
 * Delete a category
 * @route DELETE /api/warehouse/categories/:id
 */
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID format"
      });
    }
    
    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id }
    });
    
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }
    
    // TODO: Check if there are products using this category
    // If we want to prevent deleting categories in use
    
    // Delete category
    await prisma.category.delete({
      where: { id }
    });
    
    return res.status(200).json({
      success: true,
      message: "Category deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message
    });
  }
};