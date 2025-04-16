const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");

const GetAdminDetails = asyncHandler(async (req, res) => {
    const { email } = req.params;
    try {
        if (!email) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false,
            });
        }

        const user = await prisma.admin.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Admin Does Not Exist",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Admin Details Fetched Successfully!",
            success: true,
            userInfo: user,
        });
    } catch (error) {
        res.status(501).json({
            message: "Admin Details Fetching Failed",
            success: false,
        });
    }
});

module.exports = { GetAdminDetails };
