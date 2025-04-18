const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");


/*
 *@usage - DELETE USERS (PROCUREMENT OFFICERS || WAREHOUSE MANAGER)
 *@PARAMS - EMAIL
 *@RETURN - DELETES THE USERS
 */
const DeleteUser = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false,
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            return res.status(401).json({
                message: "User Does Not Exist",
                success: false,
            });
        }
        await prisma.user.delete({
            where: { email: existingUser.email }
        })
        return res.status(200).json({
            message: "User Deleted Successfully!",
            success: true,
        });
    } catch (error) {
        res.status(501).json({
            message: "Admin Details Fetching Failed",
            success: false,
        });
    }
});

module.exports = { DeleteUser };
