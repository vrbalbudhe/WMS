// Backend/routes/admin_Routes/admin_auth_routes.js
const express = require("express");
const { login } = require("../../controllers/admin/admin_auth_controllers/login");
const { register } = require("../../controllers/admin/admin_auth_controllers/register");
const { OtherUsersRegister } = require("../../controllers/admin/admin_users_controllers/register");
const only_admin_role = require("../../middlewares/only_admin_role");
// Check this import - make sure the function name matches what's exported
const { sendUserCredentials } = require("../../controllers/admin/admin_users_controllers/email_credintials");
const { DeleteUser } = require("../../controllers/admin/admin_users_controllers/deleteUser");

const router = express.Router();

// ADMIN REGISTER || LOGIN ROUTES
router.post("/login", login);
router.post("/register", register);

// OTHER USERS REGISTER || LOGIN ROUTES
router.post("/oul/register", only_admin_role, OtherUsersRegister);

// OTHER USERS DELETE ROUTES
router.post("/oul/delete", only_admin_role, DeleteUser);

// USERS CREDENTIALS SEND ROUTE
// Updated to use the correct function name from the import
router.post("/oul/send-credintials", only_admin_role, sendUserCredentials);

module.exports = router;