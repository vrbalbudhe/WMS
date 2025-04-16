const express = require("express");
const only_admin_role = require("../../middlewares/only_admin_role");
const { GetAdminDetails } = require("../../controllers/admin/admin_crud_controllers/get_admin_info");

const router = express.Router();

// GET USERS DETAILS USING :EMAIL
router.get("/:email", GetAdminDetails);

module.exports = router;
