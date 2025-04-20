// Path: Backend\controllers\admin\admin_users_controllers\getAllUsers.js
const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");

/**
 * @usage - GET ALL USERS WITH OPTIONAL FILTERING
 * @PARAMS - query params: userType, status, search
 * @RETURN - LIST OF USERS
 */
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const { userType, status, search, page = 1, limit = 10 } = req.query;
        
        console.log("Fetch users request with params:", req.query);
        
        // Build the where clause based on filters
        const where = {};
        
        if (userType && userType !== 'all') {
            where.userType = userType;
        }
        
        if (status && status !== 'all') {
            where.status = status;
        }
        
        // MongoDB doesn't support case-insensitive contains by default
        // We need to adjust the search implementation
        if (search) {
            // In MongoDB with Prisma, you can use regex for searching
            where.OR = [
                { name: { contains: search } },
                { email: { contains: search } }
            ];
            
            // If phone is included in the search, add it conditionally
            // because MongoDB will error if searching a non-existing field
            if (search.match(/^[0-9+\s-]+$/)) {  // Only add phone search if the search looks like a phone number
                where.OR.push({ phone: { contains: search } });
            }
        }
        
        console.log("Query where clause:", where);
        
        // Get total count for pagination
        const totalUsers = await prisma.user.count({ where });
        
        console.log("Total users count:", totalUsers);
        
        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const take = parseInt(limit);
        
        // Get users with their warehouse info
        const users = await prisma.user.findMany({
            where,
            include: {
                warehouse: true
            },
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        console.log(`Found ${users.length} users`);
        
        return res.status(200).json({
            success: true,
            users,
            totalUsers,
            totalPages: Math.ceil(totalUsers / take),
            currentPage: parseInt(page)
        });
    } catch (error) {
        console.error("Get all users error:", error);
        res.status(500).json({
            message: "Failed to fetch users",
            success: false,
            error: error.message,
            stack: error.stack
        });
    }
});

module.exports = { getAllUsers };