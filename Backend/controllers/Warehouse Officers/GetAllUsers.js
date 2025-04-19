const asyncHandler = require("express-async-handler")
const prisma = require("../../lib/prisma");

const GetAllUsers = asyncHandler(async (req, res) => {
    try {
        const GetAllUsr = await prisma.user.findMany({
            where: {
                userType: "warehouse_manager"
            }
        })
        if (!GetAllUsr) {
            return res.status(401).json({
                message: "Unable to Get All Procurement Officers Info",
                success: false,
            });
        }
        return res.status(200).json({
            message: "All Procurement Officers Info Fetched Successfully.",
            success: true,
            GetAllUsr,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Get All Procurement Officers Info Failed",
            success: false,
        });
    }
})

module.exports = { GetAllUsers }