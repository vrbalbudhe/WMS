// Path: Backend/routes/warehouse_manager_Routes.js
const express = require("express");
const { GetAllUsers } = require("../controllers/Warehouse Officers/GetAllUsers");
const verifyToken = require("../middlewares/verifyTokenMW");

// Import controllers
const { 
  createCategory, 
  getAllCategories, 
  getCategoryById, 
  updateCategory,
  deleteCategory 
} = require("../controllers/warehouse/CategoryController");

// Import product controller with the correct case
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/warehouse/ProductController"); // Make sure this matches the actual filename case

const router = express.Router();

// GET ALL PROCUREMENT-OFFICERS INFO
router.get("/all", GetAllUsers);

// Category Routes
router.post("/categories", verifyToken, createCategory);
router.get("/categories", verifyToken, getAllCategories);
router.get("/categories/:id", verifyToken, getCategoryById);
router.put("/categories/:id", verifyToken, updateCategory);
router.delete("/categories/:id", verifyToken, deleteCategory);

// Product Routes
router.post("/products", verifyToken, createProduct);
router.get("/products", verifyToken, getAllProducts);
router.get("/products/:id", verifyToken, getProductById);
router.put("/products/:id", verifyToken, updateProduct);
router.delete("/products/:id", verifyToken, deleteProduct);

module.exports = router;