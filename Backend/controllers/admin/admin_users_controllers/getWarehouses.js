// Path: Backend\controllers\admin\admin_users_controllers\getWarehouses.js
const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");

/**
 * @usage - GET ALL WAREHOUSES FOR USER DROPDOWN
 * @RETURN - LIST OF WAREHOUSES
 */
const getWarehouses = asyncHandler(async (req, res) => {
  try {
    const warehouses = await prisma.warehouse.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true
      }
    });
    
    return res.status(200).json({
      success: true,
      warehouses
    });
  } catch (error) {
    console.error("Error fetching warehouses:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch warehouses",
      error: error.message
    });
  }
});

module.exports = { getWarehouses };