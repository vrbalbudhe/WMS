const express = require("express");
const { GetAllUsers } = require("../controllers/Warehouse Officers/GetAllUsers");
const router = express.Router();

// GET ALL PROCUREMENT-OFFICERS INFO
router.get("/all", GetAllUsers);

module.exports = router;