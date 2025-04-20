// Backend\controllers\admin\admin_users_controllers\register.js (updated)
const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Function to generate a random password
const generatePassword = () => {
  return crypto.randomBytes(8).toString('hex');
};

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const OtherUsersRegister = asyncHandler(async (req, res) => {
    const { name, userType, email, password, phone, employeeId, warehouseId } = req.body;
    try {
      console.log("Received registration request with data:", req.body);
      
      // Check for required fields
      if (!email || !name || !userType) {
        return res.status(400).json({
          success: false,
          error: "Required fields (name, userType, email) are missing!"
        });
      }
  
      // Validate phone number format if provided
      if (phone) {
        // Check if phone number is already in use
        const existingUserWithPhone = await prisma.user.findFirst({
          where: {
            phone: phone
          }
        });
  
        if (existingUserWithPhone) {
          return res.status(400).json({
            success: false,
            error: "This phone number is already in use by another user."
          });
        }
  
        // Optional: Add more phone validation if needed
      }
  
      // Check for existing user
      const existingUser = await prisma.user.findUnique({
        where: { email: email }
      });
  
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists with the given email."
        });
      }
  
      // Generate a random password if not provided
      const userPassword = password || generatePassword();
      const hashedPassword = await bcrypt.hash(userPassword, 10);
  
      // Create the user with proper data structure
      const userData = {
        name,
        email,
        password: hashedPassword,
        userType,
        mustChangePassword: true,
        status: "pending"
      };
  
      // Only add optional fields if they exist
      if (phone && phone.trim() !== '') userData.phone = phone;
      if (employeeId && employeeId.trim() !== '') userData.employeeId = employeeId;
      if (warehouseId && warehouseId.trim() !== '') userData.warehouseId = warehouseId;
  
      console.log("Creating user with data:", userData);
  
      const newUser = await prisma.user.create({
        data: userData
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
        userId: newUser.id
      });
    } catch (error) {
      console.error("User registration error details:", error);
      return res.status(500).json({
        success: false,
        message: "User registration failed: " + error.message,
        error: error.message
      });
    }
  });

module.exports = { OtherUsersRegister };