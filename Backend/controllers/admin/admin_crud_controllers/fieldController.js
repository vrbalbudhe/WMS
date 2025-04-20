// Path: Backend/controllers/admin/admin_crud_controllers/fieldController.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new custom field
exports.createField = async (req, res) => {
  try {
    const { name, type, isRequired, options } = req.body;

    // Validate required fields
    if (!name || !type) {
      return res.status(400).json({ message: 'Name and type are required' });
    }

    // Check if field already exists
    const existingField = await prisma.warehouseFieldConfig.findFirst({
      where: {
        name,
      },
    });

    if (existingField) {
      return res.status(400).json({
        success: false,
        message: 'Field with this name already exists',
      });
    }

    const field = await prisma.warehouseFieldConfig.create({
      data: {
        name,
        type,
        isRequired: isRequired || false,
        options: options || [],
      },
    });

    res.status(201).json({
      success: true,
      message: 'Field created successfully',
      data: field,
    });
  } catch (error) {
    console.error('Error creating field:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create field',
      error: error.message,
    });
  }
};

// Get all custom fields
exports.getAllFields = async (req, res) => {
  try {
    const fields = await prisma.warehouseFieldConfig.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      count: fields.length,
      data: fields,
    });
  } catch (error) {
    console.error('Error fetching fields:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fields',
      error: error.message,
    });
  }
};

// Update a custom field
exports.updateField = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, isRequired, options } = req.body;

    // Check if field exists
    const fieldExists = await prisma.warehouseFieldConfig.findUnique({
      where: {
        id,
      },
    });

    if (!fieldExists) {
      return res.status(404).json({
        success: false,
        message: 'Field not found',
      });
    }

    // Update field
    const updatedField = await prisma.warehouseFieldConfig.update({
      where: {
        id,
      },
      data: {
        name,
        type,
        isRequired: isRequired !== undefined ? isRequired : fieldExists.isRequired,
        options: options || fieldExists.options,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Field updated successfully',
      data: updatedField,
    });
  } catch (error) {
    console.error('Error updating field:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update field',
      error: error.message,
    });
  }
};

// Delete a custom field
exports.deleteField = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if field exists
    const fieldExists = await prisma.warehouseFieldConfig.findUnique({
      where: {
        id,
      },
    });

    if (!fieldExists) {
      return res.status(404).json({
        success: false,
        message: 'Field not found',
      });
    }

    // Delete field
    await prisma.warehouseFieldConfig.delete({
      where: {
        id,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Field deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting field:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete field',
      error: error.message,
    });
  }
};