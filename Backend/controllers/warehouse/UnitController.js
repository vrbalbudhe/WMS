// Backend/controllers/warehouse/UnitController.js
const prisma = require("../../lib/prisma");
const QRCode = require('qrcode');

/**
 * Generate a QR code for a specific unit
 * @route GET /api/warehouse/units/:unitId/qr
 */
exports.generateQRCode = async (req, res) => {
  try {
    const { unitId } = req.params;
    
    // Find the unit
    const unit = await prisma.unit.findUnique({
      where: { unitId },
      include: { product: true }
    });
    
    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found"
      });
    }
    
    // Generate QR code as data URL
    const qrDataUrl = await QRCode.toDataURL(unit.qrCodeData);
    
    res.status(200).json({
      success: true,
      data: {
        unit,
        qrCode: qrDataUrl
      }
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate QR code",
      error: error.message
    });
  }
};

/**
 * Scan a QR code to get unit details
 * @route POST /api/warehouse/units/scan
 */
exports.scanQRCode = async (req, res) => {
  try {
    const { qrData } = req.body;
    
    if (!qrData) {
      return res.status(400).json({
        success: false,
        message: "QR code data is required"
      });
    }
    
    // Find the unit by QR code data
    const unit = await prisma.unit.findUnique({
      where: { qrCodeData: qrData },
      include: {
        product: {
          include: {
            category: true,
            warehouse: true
          }
        }
      }
    });
    
    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found for the scanned QR code"
      });
    }
    
    res.status(200).json({
      success: true,
      data: unit
    });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process QR code scan",
      error: error.message
    });
  }
};

/**
 * Update unit status
 * @route PUT /api/warehouse/units/:unitId/status
 */
exports.updateUnitStatus = async (req, res) => {
  try {
    const { unitId } = req.params;
    const { status, notes } = req.body;
    
    // Validate status is a valid enum value
    const validStatuses = ["available", "reserved", "sold", "damaged", "lost"];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
    
    // Find the unit
    const unit = await prisma.unit.findUnique({
      where: { unitId }
    });
    
    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found"
      });
    }
    
    // Update unit status
    const updatedUnit = await prisma.unit.update({
      where: { unitId },
      data: { 
        status,
        notes: notes || unit.notes
      }
    });
    
    res.status(200).json({
      success: true,
      message: "Unit status updated successfully",
      data: updatedUnit
    });
  } catch (error) {
    console.error("Error updating unit status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update unit status",
      error: error.message
    });
  }
};

/**
 * Get all units for a product
 * @route GET /api/warehouse/products/:productId/units
 */
exports.getProductUnits = async (req, res) => {
  try {
    const { productId } = req.params;
    const { status, page = 1, limit = 100 } = req.query;
    
    // Build filter
    const filter = { productId };
    
    // Add status filter if provided
    if (status) {
      filter.status = status;
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get units with pagination
    const units = await prisma.unit.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      skip,
      take: parseInt(limit)
    });
    
    // Get total count for pagination
    const totalCount = await prisma.unit.count({
      where: filter
    });
    
    res.status(200).json({
      success: true,
      data: units,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(totalCount / parseInt(limit))
      }
    });
  } catch (error) {
    console.error("Error fetching product units:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch product units",
      error: error.message
    });
  }
};

/**
 * Delete a unit
 * @route DELETE /api/warehouse/units/:unitId
 */
exports.deleteUnit = async (req, res) => {
  try {
    const { unitId } = req.params;
    
    console.log(`Attempting to delete unit with ID: ${unitId}`);
    
    // Find the unit
    const unit = await prisma.unit.findUnique({
      where: { unitId },
      include: { product: true }
    });
    
    // Log unit lookup results for debugging
    console.log("Unit lookup result:", unit ? "Found" : "Not found");
    
    if (!unit) {
      return res.status(404).json({
        success: false,
        message: `Unit with ID ${unitId} not found`
      });
    }
    
    // Begin transaction to delete unit and update product quantity
    const result = await prisma.$transaction(async (tx) => {
      // Delete the unit
      await tx.unit.delete({
        where: { id: unit.id } // Use the internal ID, not the unitId
      });
      
      // Update product quantity
      const updatedProduct = await tx.product.update({
        where: { id: unit.productId },
        data: {
          quantity: {
            decrement: 1
          }
        }
      });
      
      return { unitId, product: updatedProduct };
    });
    
    res.status(200).json({
      success: true,
      message: "Unit removed successfully",
      data: {
        removedUnitId: result.unitId,
        productId: result.product.id,
        newQuantity: result.product.quantity
      }
    });
  } catch (error) {
    console.error("Error deleting unit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete unit",
      error: error.message
    });
  }
};