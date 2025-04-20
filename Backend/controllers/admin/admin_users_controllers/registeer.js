const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const prisma = require("../../../lib/prisma");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
            const existingUserWithPhone = await prisma.user.findFirst({
                where: { phone }
            });

            if (existingUserWithPhone) {
                return res.status(400).json({
                    success: false,
                    error: "This phone number is already in use by another user."
                });
            }
        }

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email }
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

        // Add optional fields if provided
        if (phone) userData.phone = phone;
        if (employeeId) userData.employeeId = employeeId;
        if (warehouseId) userData.warehouseId = warehouseId;

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

        // Send confirmation email (optional, to user or admin)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Welcome to Our Platform',
            text: `Hello ${newUser.name},\n\nYour account has been created successfully. Your initial password is: ${userPassword}. Please login and change your password as soon as possible.\n\nBest regards, \nThe Team`
        };

        // Send welcome email to the user
        await transporter.sendMail(mailOptions);

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

