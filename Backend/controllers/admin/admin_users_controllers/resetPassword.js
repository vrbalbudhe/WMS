// Path: Backend\controllers\admin\admin_users_controllers\resetPassword.js
const asyncHandler = require("express-async-handler");
const prisma = require("../../../lib/prisma");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

/**
 * @usage - RESET USER PASSWORD
 * @PARAMS - userId
 * @RETURN - SUCCESS MESSAGE AND SENDS EMAIL WITH NEW PASSWORD
 */
const resetPassword = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    console.log("  -- - -- -- > ", userId)
    try {
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false,
            });
        }

        // Find the user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { warehouse: true }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Generate a random password
        const newPassword = crypto.randomBytes(8).toString('hex');

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and set mustChangePassword to true
        await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword,
                mustChangePassword: true
            }
        });

        // Configure nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset - Warehouse Management System",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
                    <h2 style="color: #2563eb;">Password Reset</h2>
                    <p>Hello ${user.name},</p>
                    <p>Your password has been reset. Here are your new login credentials:</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
                        <p style="margin: 5px 0;"><strong>New Password:</strong> ${newPassword}</p>
                    </div>
                    <p>Please log in with your new password. You will be required to change your password upon your first login.</p>
                    <p>If you did not request this password reset, please contact your administrator immediately.</p>
                    <p>Thank you,<br>Warehouse Management System Team</p>
                </div>
            `
        };

        // Send the email
        const sendingEmail = await transporter.sendMail(mailOptions);

        if (!sendingEmail) {
            return res.status(200).json({
                message: "Sorry unable to send email",
                success: false
            });
        }

        return res.status(200).json({
            message: "Password reset successfully. A new password has been sent to the user's email.",
            success: true
        });
    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({
            message: "Failed to reset password",
            success: false,
            error: error.message
        });
    }
});

module.exports = { resetPassword };