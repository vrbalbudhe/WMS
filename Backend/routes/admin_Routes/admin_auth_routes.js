const express = require("express");
const { login } = require("../../controllers/admin/admin_auth_controllers/login");
const { register } = require("../../controllers/admin/admin_auth_controllers/register");

const { OtherUsersRegister } = require("../../controllers/admin/admin_users_controllers/register");
const only_admin_role = require("../../middlewares/only_admin_role");
const { sendCredentials } = require("../../controllers/admin/admin_users_controllers/email_credintials");

const router = express.Router();

// ADMIN REGISTER || LOGIN ROUTES
router.post("/login", login);
router.post("/register", register);

// OTHER USERS REGISTER || LOGIN ROUTES
router.post("/oul/register", only_admin_role, OtherUsersRegister);

// USERS CREDINTIALS SEND ROUTE
router.post("/send-credintials", only_admin_role, sendCredentials);

module.exports = router;
