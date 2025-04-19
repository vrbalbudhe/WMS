// Path: Backend\controllers\admin\admin_users_controllers\updateUser.js
const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");
const bcrypt = require("bcrypt");

/**
 * @usage - UPDATE USER DETAILS
 * @PARAMS - userId and updated fields
 * @RETURN - UPDATED USER
 */
const updateUser = asyncHandler(async (req, res) => {
    const { userId, name, email, phone, employeeId, warehouseId, status, userType } = req.body;
    
    try {
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
            });
        }
        
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId },
        });
        
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        
        // Check if email is being changed and is already in use
        if (email && email !== existingUser.email) {
            const emailInUse = await prisma.user.findUnique({
                where: { email },
            });
            
            if (emailInUse) {
                return res.status(400).json({
                    message: "Email is already in use",
                    success: false,
                });
            }
        }
        
        // Check if phone is being changed and is already in use
        if (phone && phone !== existingUser.phone) {
            const phoneInUse = await prisma.user.findFirst({
                where: { 
                    phone,
                    NOT: { id: userId }
                },
            });
            
            if (phoneInUse) {
                return res.status(400).json({
                    message: "Phone number is already in use",
                    success: false,
                });
            }
        }
        
        // Build update data object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (employeeId) updateData.employeeId = employeeId;
        if (warehouseId) updateData.warehouseId = warehouseId;
        if (status) updateData.status = status;
        if (userType) updateData.userType = userType;
        
        // Update user
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: { warehouse: true }
        });
        
        return res.status(200).json({
            message: "User updated successfully",
            success: true,
            user: updatedUser
        });
    } catch (error) {
        console.error("Update user error:", error);
        res.status(500).json({
            message: "Failed to update user",
            success: false,
            error: error.message
        });
    }
});

module.exports = { updateUser };