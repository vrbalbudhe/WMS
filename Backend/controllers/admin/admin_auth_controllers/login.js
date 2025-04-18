const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory",
                success: false,
            });
        }

        const Admin_User = await prisma.admin.findUnique({
            where: { email: email },
        });

        if (!Admin_User) {
            return res.status(401).json({
                message: "Admin User Does Not Exist",
                success: false,
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, Admin_User.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Password Incorrect",
                success: false,
            });
        }

        const tokenData = {
            id: Admin_User.id,
            email: Admin_User.email,
            role: "ADMIN"
        };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        const CookieOptions = {
            httpOnly: true,
            maxAge: 1000 * 60 * 105,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
            secure: "None",
        };

        const { password: _, ...userInfo } = Admin_User;

        res.cookie("token", token, CookieOptions);

        return res.status(200).json({
            message: "Admin Login Successful",
            success: true,
            role: "ADMIN",
            user: userInfo,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Admin Login Failed",
            success: false,
        });
    }
});

module.exports = { login };
