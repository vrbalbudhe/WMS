// Backend/routes/admin_Routes/admin_users_routes.js
const express = require("express");
const { OtherUsersRegister } = require("../../controllers/admin/admin_users_controllers/register");
const { sendUserCredentials } = require("../../controllers/admin/admin_users_controllers/email_credintials");
const { DeleteUser } = require("../../controllers/admin/admin_users_controllers/deleteUser");
const only_admin_role = require("../../middlewares/only_admin_role");

const router = express.Router();

// Protected routes that require admin role
router.post("/register", only_admin_role, OtherUsersRegister);

// Use the correct function name that's exported
router.post("/send-credentials", only_admin_role, sendUserCredentials);

// Make sure DeleteUser is properly exported
router.post("/delete", only_admin_role, DeleteUser);

module.exports = router;