// Path: Backend\controllers\admin\admin_users_controllers\deleteUser.js
const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");

/**
 * @usage - DELETE USERS (PROCUREMENT OFFICERS || WAREHOUSE MANAGER)
 * @PARAMS - userId
 * @RETURN - DELETES THE USER
 */
const DeleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    
    try {
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
            });
        }
        
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        
        await prisma.user.delete({
            where: { id: userId }
        });
        
        return res.status(200).json({
            message: "User deleted successfully",
            success: true,
        });
    } catch (error) {
        console.error("Delete user error:", error);
        res.status(500).json({
            message: "Failed to delete user",
            success: false,
            error: error.message
        });
    }
});

module.exports = { DeleteUser };