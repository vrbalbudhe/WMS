const express = require("express");
const {
  GetUserDetails,
} = require("../../controllers/users/users_other_controllers/UserCRUD");
const router = express.Router();

// USER DETAILS FETCHING
router.get("/:email", GetUserDetails);

module.exports = router;
