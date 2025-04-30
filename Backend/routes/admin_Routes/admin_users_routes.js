// Path: Backend\routes\admin_Routes\admin_users_routes.js
const express = require("express");
const { OtherUsersRegister } = require("../../controllers/admin/admin_users_controllers/registeer");
const { sendUserCredentials } = require("../../controllers/admin/admin_users_controllers/email_credintials");
const { DeleteUser } = require("../../controllers/admin/admin_users_controllers/deleteUser");
const { getAllUsers } = require("../../controllers/admin/admin_users_controllers/getAllUsers");
const { updateUser } = require("../../controllers/admin/admin_users_controllers/updateUser");
const { resetPassword } = require("../../controllers/admin/admin_users_controllers/resetPassword");
const only_admin_role = require("../../middlewares/only_admin_role");
const { getWarehouses } = require("../../controllers/admin/admin_users_controllers/getWarehouses");

const router = express.Router();

// User management routes
router.post("/register", only_admin_role, OtherUsersRegister);
router.post("/send-credentials", only_admin_role, sendUserCredentials);
router.post("/delete", only_admin_role, DeleteUser);
router.get("/", only_admin_role, getAllUsers);
router.put("/update", only_admin_role, updateUser);
router.post("/reset-password", resetPassword);
router.get("/warehouses", only_admin_role, getWarehouses);

module.exports = router;