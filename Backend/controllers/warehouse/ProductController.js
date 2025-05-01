// Path: Backend/controllers/warehouse/ProductController.js
const prisma = require("../../lib/prisma");
const crypto = require("crypto");

/**
 * Generate a unique unit ID based on product and sequence
 * @param {string} productId - The product ID
 * @param {number} sequence - The sequence number of the unit (1-based)
 * @returns {string} - A formatted unit ID
 */
const generateUnitId = (productName, productId, sequence) => {
  // Take first 4 chars of product ID
  const productIdShort = productId.substring(0, 4);
  
  // Create a slug from product name (first 3 chars)
  const nameSlug = productName
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase()
    .substring(0, 3);
  
  // Format as PROD-1234-001 (padding sequence with zeros)
  return `${nameSlug}-${productIdShort}-${sequence.toString().padStart(4, '0')}`;
};

/**
 * Generate QR code data for a unit
 * @param {string} unitId - The unit ID
 * @returns {string} - The QR code data
 */
const generateQRCodeData = (unitId) => {
  // Generate a random string to make QR data unique
  const randomStr = crypto.randomBytes(4).toString('hex');
  return `${unitId}-${randomStr}`;
};

/**
 * Create units for a product in batch
 * @param {object} productData - Product data with ID and quantity
 * @param {string} userId - User ID who created the units
 * @returns {Promise<Array>} - Array of created units
 */
const createProductUnits = async (productData, userId) => {
  const { id: productId, name, quantity } = productData;
  const units = [];
  
  // Create specified number of units
  for (let i = 1; i <= quantity; i++) {
    const unitId = generateUnitId(name, productId, i);
    const qrCodeData = generateQRCodeData(unitId);
    
    const unit = await prisma.unit.create({
      data: {
        unitId,
        qrCodeData,
        productId,
        createdByUserId: userId
      }
    });
    
    units.push(unit);
  }
  
  return units;
};

/**
 * Create a new product with units
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
      customFields,
      generateUnits = true // Flag to control unit generation
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
    
    // Create units if quantity > 0 and flag is true
    let units = [];
    if (generateUnits && product.quantity > 0) {
      units = await createProductUnits(product, userId);
    }

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {
        product,
        unitCount: units.length,
        units: units.slice(0, 5) // Return only first 5 units to avoid large response
      }
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
      limit = 100,
      includeUnitCount = false // Flag to include unit count
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
        },
        ...(includeUnitCount === 'true' || includeUnitCount === true
          ? { _count: { select: { units: true } } }
          : {})
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
    const { includeUnits = false } = req.query;
    
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
        },
        ...(includeUnits === 'true' || includeUnits === true
          ? {
              units: {
                take: 100, // Limit to prevent large responses
                orderBy: { createdAt: 'desc' }
              },
              _count: { select: { units: true } }
            }
          : { _count: { select: { units: true } } })
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
        customFields,
        addUnits = false // Flag to add new units if quantity increases
      } = req.body;
      
      console.log("Updating product:", id, "with data:", req.body);
      
      // Validate MongoDB ObjectId format
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID format"
        });
      }
      
      // Check if product exists and get current quantity
      const productExists = await prisma.product.findUnique({
        where: { id },
        include: { _count: { select: { units: true } } }
      });
      
      if (!productExists) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      // Calculate how many new units to create (if quantity is increasing)
      const currentQuantity = productExists.quantity;
      const newQuantity = quantity !== undefined ? parseInt(quantity) : currentQuantity;
      const unitsToAdd = addUnits && newQuantity > currentQuantity 
        ? newQuantity - currentQuantity 
        : 0;
      
      // Prepare update data
      const updateData = {};
      
      // Only include fields that are provided in the request
      if (name !== undefined) updateData.name = name;
      if (description !== undefined) updateData.description = description;
      if (sku !== undefined) updateData.sku = sku;
      if (categoryId !== undefined) updateData.categoryId = categoryId === "" ? null : categoryId;
      if (warehouseId !== undefined) updateData.warehouseId = warehouseId === "" ? null : warehouseId;
      if (quantity !== undefined) updateData.quantity = newQuantity;
      if (minStockLevel !== undefined) updateData.minStockLevel = minStockLevel;
      if (customFields !== undefined) updateData.customFields = customFields;
      
      // Add updated by user ID if available
      if (req.user?.id) {
        updateData.updatedByUserId = req.user.id;
      }
      
      console.log("Update data:", updateData);
      
      // Update product first
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
          },
          _count: { select: { units: true } }
        }
      });
      
      // Create new units if quantity has increased and addUnits flag is true
      let newUnits = [];
      if (unitsToAdd > 0) {
        try {
          // Determine the current unit count to start numbering from
          const currentUnitCount = productExists._count.units;
          
          // Create each new unit one by one outside of a transaction
          for (let i = 1; i <= unitsToAdd; i++) {
            const sequence = currentUnitCount + i;
            const unitId = generateUnitId(updatedProduct.name, id, sequence);
            const qrCodeData = generateQRCodeData(unitId);
            
            const unit = await prisma.unit.create({
              data: {
                unitId,
                qrCodeData,
                productId: id,
                createdByUserId: req.user?.id || null
              }
            });
            
            newUnits.push(unit);
          }
        } catch (unitError) {
          console.error("Error creating units:", unitError);
          // We'll continue even if unit creation fails, just log the error
        }
      }
      
      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
        unitsAdded: newUnits.length,
        newUnits: newUnits.slice(0, 5) // Return only first 5 units to avoid large response
      });
    } catch (error) {
      console.error("Error updating product:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: error.message,
        stack: error.stack
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
    const { deleteUnits = true } = req.query; // Flag to control unit deletion
    
    // Validate MongoDB ObjectId format
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }
    
    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id },
      include: { _count: { select: { units: true } } }
    });
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    
    // Delete associated units if flag is true
    if (deleteUnits) {
      await prisma.unit.deleteMany({
        where: { productId: id }
      });
    } else if (product._count.units > 0) {
      // If units exist and we're not deleting them, prevent product deletion
      return res.status(400).json({
        success: false,
        message: "Cannot delete product that has units. Set deleteUnits=true to delete them as well."
      });
    }
    
    // Delete product
    await prisma.product.delete({
      where: { id }
    });
    
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      unitsDeleted: deleteUnits ? product._count.units : 0
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