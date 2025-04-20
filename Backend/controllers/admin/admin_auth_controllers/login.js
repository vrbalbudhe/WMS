// Backend\controllers\admin\admin_auth_controllers\login.js
const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Admin login attempt:", email);
        
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
        
        const cookieOptions = {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            path: "/",
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production"
        };
        
        // Create a copy of Admin_User without the password
        const { password: _, ...userInfo } = Admin_User;
        
        // Add userType for consistency with regular user login
        userInfo.userType = "ADMIN";
        
        res.cookie("token", token, cookieOptions);
        
        console.log("Admin login successful, setting cookie and returning user info");
        
        return res.status(200).json({
            message: "Admin Login Successful",
            success: true,
            role: "ADMIN",
            user: userInfo
        });
    } catch (error) {
        console.error("Admin login error:", error);
        return res.status(500).json({
            message: "Admin Login Failed",
            success: false,
            error: error.message
        });
    }
});

module.exports = { login };