// Backend\controllers\users\users_auth_controllers\login.js
const prisma = require("../../../lib/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  try {
    console.log("User login attempt:", email);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { warehouse: true }
    });
    
    console.log("User found:", user ? user.email : "No user found");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Create a JWT token
    const tokenData = {
      id: user.id,
      email: user.email,
      role: user.userType,
      warehouseId: user.warehouseId
    };
    
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h"
    });

    // Set the token as an HTTP-only cookie with consistent settings
    const cookieOptions = {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: "/",
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production"
    };
    
    res.cookie("token", token, cookieOptions);
    
    console.log("User login successful, setting cookie and returning user info");

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        warehouseId: user.warehouseId,
        warehouseName: user.warehouse?.name,
        mustChangePassword: user.mustChangePassword
      }
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
      error: error.message
    });
  }
});

module.exports = { userLogin };