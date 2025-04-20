const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const register = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "All Fields Are Required!"
            })
        }
        const existing_Admin_User = await prisma.admin.findUnique({
            where: {
                email: email,
            },
        });

        if (existing_Admin_User) {
            return res.status(400).json({
                message: "Admin User Already Exists With Given EmailID.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const New_Admin_User = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        if (!New_Admin_User) {
            return res.status(403).json({
                message: "Unable to create admin User.",
                success: false,
            });
        }
        return res.status(201).json({
            message: "User Successfully Created.",
            success: true,
        });

    } catch (error) {
        res.status(501).json({
            message: "Admin Registration Failed",
            success: false,
        });
    }
})

module.exports = { register }