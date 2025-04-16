const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const OtherUsersLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Both email and password are required!"
            });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials.",
            });
        }

        const { password: _, ...userInfo } = user;

        const token = jwt.sign(
            { id: user.id, userType: user.userType },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie("token", token);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            role: user.userType,
            user: userInfo
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failed. Please try again.",
        });
    }
});

module.exports = { OtherUsersLogin };
