// Path: Backend/controllers/admin/admin_crud_controllers/warehouseController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new warehouse
exports.createWarehouse = async (req, res) => {
  try {
    const { name, address, city, pincode, googleMapLink, description, customFields } = req.body;

    // Validate required fields
    if (!name || !address || !city || !pincode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const warehouse = await prisma.warehouse.create({
      data: {
        name,
        address,
        city,
        pincode,
        googleMapLink,
        description,
        customFields: customFields || {},
      },
    });

    res.status(201).json({
      success: true,
      message: 'Warehouse created successfully',
      data: warehouse,
    });
  } catch (error) {
    console.error('Error creating warehouse:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create warehouse',
      error: error.message,
    });
  }
};

// Get all warehouses
exports.getAllWarehouses = async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      count: warehouses.length,
      data: warehouses,
    });
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch warehouses',
      error: error.message,
    });
  }
};

// Get warehouses for dropdown (simplified version for user management)
exports.getWarehousesForDropdown = async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      warehouses,
    });
  } catch (error) {
    console.error('Error fetching warehouses for dropdown:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch warehouses',
      error: error.message,
    });
  }
};

// Get a single warehouse by ID
exports.getWarehouseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid warehouse ID format',
      });
    }

    const warehouse = await prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouse) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      });
    }

    res.status(200).json({
      success: true,
      data: warehouse,
    });
  } catch (error) {
    console.error('Error fetching warehouse:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch warehouse',
      error: error.message,
    });
  }
};

// Update a warehouse
exports.updateWarehouse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, city, pincode, googleMapLink, description, customFields } = req.body;

    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid warehouse ID format',
      });
    }

    // Check if warehouse exists
    const warehouseExists = await prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouseExists) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      });
    }

    // Update warehouse
    const updatedWarehouse = await prisma.warehouse.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        city,
        pincode,
        googleMapLink,
        description,
        customFields: customFields || warehouseExists.customFields,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Warehouse updated successfully',
      data: updatedWarehouse,
    });
  } catch (error) {
    console.error('Error updating warehouse:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update warehouse',
      error: error.message,
    });
  }
};

// Delete a warehouse
exports.deleteWarehouse = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format (24 hex characters)
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid warehouse ID format',
      });
    }

    // Check if warehouse exists
    const warehouseExists = await prisma.warehouse.findUnique({
      where: {
        id,
      },
    });

    if (!warehouseExists) {
      return res.status(404).json({
        success: false,
        message: 'Warehouse not found',
      });
    }

    // Delete warehouse
    await prisma.warehouse.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Warehouse deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting warehouse:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete warehouse',
      error: error.message,
    });
  }
};