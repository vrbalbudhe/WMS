const express = require("express");
const { logout } = require("../../controllers/users/users_auth_controllers/logout");
const TokenVerification = require("../../controllers/users/users_auth_controllers/tokenVerify");
const { OtherUsersLogin } = require("../../controllers/users/users_auth_controllers/login");

const router = express.Router();

// USER LOGIN ROUTE
router.post("/login", OtherUsersLogin);

// USER LOGOUT ROUTE
router.post("/logout", logout);

// USER TOKEN VERIFICATION
router.get("/isToken", TokenVerification);

module.exports = router;
