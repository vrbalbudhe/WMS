// Path: Backend/controllers/warehouse/ProductController.js
const prisma = require("../../lib/prisma");

/**
 * Create a new product
 * @route POST /api/warehouse/products
 */
exports.createProduct = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      sku, 
      categoryId, 
      warehouseId, 
      quantity, 
      minStockLevel,
      customFields 
    } = req.body;
    
    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Product name is required"
      });
    }

    // Validate warehouseId
    const warehouse = !warehouseId && req.user.warehouseId 
      ? req.user.warehouseId 
      : warehouseId;
    
    // Get user ID from authenticated request
    const userId = req.user?.id || null;

    // Create product with appropriate data
    const productData = {
      name,
      description,
      sku,
      quantity: quantity || 0,
      minStockLevel: minStockLevel || 0,
      customFields: customFields || {}
    };

    // Only add relations if they exist
    if (categoryId) {
      productData.categoryId = categoryId;
    }
    
    if (warehouse) {
      productData.warehouseId = warehouse;
    }
    
    if (userId) {
      productData.createdByUserId = userId;
      productData.updatedByUserId = userId;
    }

    // Create product
    const product = await prisma.product.create({
      data: productData
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message
    });
  }
};

/**
 * Get all products with optional filtering
 * @route GET /api/warehouse/products
 */
exports.getAllProducts = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { 
      categoryId, 
      warehouseId, 
      minQuantity, 
      maxQuantity, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 100
    } = req.query;

    // Build the filter
    const filter = {};
    
    // Category filter
    if (categoryId) {
      filter.categoryId = categoryId;
    }
    
    // Warehouse filter - if not provided and user has a warehouse, use that
    if (warehouseId) {
      filter.warehouseId = warehouseId;
    } else if (req.user?.warehouseId) {
      filter.warehouseId = req.user.warehouseId;
    }
    
    // Quantity range filter
    if (minQuantity !== undefined) {
      filter.quantity = {
        ...filter.quantity,
        gte: parseInt(minQuantity)
      };
    }
    
    if (maxQuantity !== undefined) {
      filter.quantity = {
        ...filter.quantity,
        lte: parseInt(maxQuantity)
      };
    }
    
    // Search by name or description
    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Determine sort order - handle nested fields like category.name
    const orderBy = {};
    if (sortBy.includes('.')) {
      // Handle relation sorting like 'category.name'
      const [relation, field] = sortBy.split('.');
      orderBy[relation] = { [field]: sortOrder.toLowerCase() };
    } else {
      orderBy[sortBy] = sortOrder.toLowerCase();
    }
    
    // Query products with relations
    const products = await prisma.product.findMany({
      where: filter,
      include: {
        category: true,
        warehouse: {
          select: {
            id: true,
            name: true
          }
        },
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy,
      skip,
      take: parseInt(limit)
    });
    
    // Get total count for pagination
    const totalCount = await prisma.product.count({
      where: filter
    });
    
    return res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message
    });
  }
};

/**
 * Get a single product by ID
 * @route GET /api/warehouse/products/:id
 */
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }
    
    // Fetch product with relations
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        warehouse: {
          select: {
            id: true,
            name: true,
            address: true,
            city: true
          }
        },
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        updatedByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message
    });
  }
};

/**
 * Update a product
 * @route PUT /api/warehouse/products/:id
 */
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      description, 
      sku, 
      categoryId, 
      warehouseId, 
      quantity, 
      minStockLevel,
      customFields 
    } = req.body;
    
    // Validate MongoDB ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }
    
    // Check if product exists
    const productExists = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    // If category is being updated, validate it exists
    if (categoryId && categoryId !== productExists.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: categoryId }
      });
      
      if (!categoryExists) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }
    }
    
    // If warehouse is being updated, validate it exists
    if (warehouseId && warehouseId !== productExists.warehouseId) {
      const warehouseExists = await prisma.warehouse.findUnique({
        where: { id: warehouseId }
      });
      
      if (!warehouseExists) {
        return res.status(404).json({
          success: false,
          message: "Warehouse not found"
        });
      }
    }
    
    // Prepare update data
    const updateData = {};
    
    // Only include fields that are provided in the request
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (sku !== undefined) updateData.sku = sku;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (warehouseId !== undefined) updateData.warehouseId = warehouseId;
    if (quantity !== undefined) updateData.quantity = quantity;
    if (minStockLevel !== undefined) updateData.minStockLevel = minStockLevel;
    if (customFields !== undefined) updateData.customFields = customFields;
    
    // Add updated by user ID if available
    if (req.user?.id) {
      updateData.updatedByUserId = req.user.id;
    }
    
    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
        warehouse: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message
    });
  }
};

/**
 * Delete a product
 * @route DELETE /api/warehouse/products/:id
 */
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    // Delete product
    await prisma.product.delete({
      where: { id }
    });
    
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message
    });
  }
};