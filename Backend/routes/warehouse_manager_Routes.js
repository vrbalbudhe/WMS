// Path: Backend/routes/warehouse_manager_Routes.js
const express = require("express");
const { GetAllUsers } = require("../controllers/Warehouse Officers/GetAllUsers");
const verifyToken = require("../middlewares/verifyTokenMW");
const { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory,
  deleteCategory 
} = require("../controllers/warehouse/CategoryController");

const router = express.Router();

// GET ALL PROCUREMENT-OFFICERS INFO
router.get("/all", GetAllUsers);

// Category Routes
router.post("/categories", verifyToken, createCategory);
router.get("/categories", verifyToken, getAllCategories);
router.get("/categories/:id", verifyToken, getCategoryById);
router.put("/categories/:id", verifyToken, updateCategory);
router.delete("/categories/:id", verifyToken, deleteCategory);

module.exports = router;