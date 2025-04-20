const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const OtherUsersRegister = asyncHandler(async (req, res) => {
    const { name, userType, email, password, phone } = req.body;

    try {
        
        if (!email || !password || !name || !userType || !phone) {
            return res.status(400).json({
                success: false,
                error: "All fields (name, userType, email, password, phone) are required!"
            });
        }

        const validUserTypes = ["procurement_officer", "warehouse_manager"];
        if (!validUserTypes.includes(userType)) {
            return res.status(400).json({
                success: false,
                error: "Invalid userType. Must be one of: procurement_officer, warehouse_manager, admin."
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with the given email."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                userType,
                phone
            },
        });

        if (!newUser) {
            return res.status(500).json({
                success: false,
                message: "Unable to create the user.",
            });
        }

        return res.status(201).json({
            success: true,
            message: "User successfully created.",
        });
    } catch (error) {
        console.error(error);
        return res.status(501).json({
            success: false,
            message: "User registration failed. Please try again.",
        });
    }
});

module.exports = { OtherUsersRegister };
