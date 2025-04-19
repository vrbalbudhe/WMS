// routes/users_auth_Routes/authRoutes.js
const express = require("express");
const { userLogin } = require("../../controllers/users/users_auth_controllers/login");
const { logout } = require("../../controllers/users/users_auth_controllers/logout");
const { changePassword } = require("../../controllers/users/users_auth_controllers/changePassword");
const verifyToken = require("../../middlewares/verifyTokenMW");
const { tokenVerify } = require("../../controllers/users/users_auth_controllers/tokenVerify");

const router = express.Router();

// Authentication routes
router.post("/login", userLogin);
router.post("/logout", logout);
router.post("/change-password", verifyToken, changePassword);
router.get("/isToken", tokenVerify); // Make sure this uses the actual exported function

module.exports = router;