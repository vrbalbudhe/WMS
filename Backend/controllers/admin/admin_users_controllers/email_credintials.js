// Backend\controllers\admin\admin_users_controllers\email_credintials.js
const prisma = require("../../../lib/prisma");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUserCredentials = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required!"
      });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { warehouse: true }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found with the given email."
      });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Warehouse Management System Credentials",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb;">Welcome to the Warehouse Management System</h2>
          <p>Hello ${user.name},</p>
          <p>Your account has been created successfully. Here are your login credentials:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${user.email}</p>
            <p style="margin: 5px 0;"><strong>Password:</strong> ${password}</p>
            <p style="margin: 5px 0;"><strong>Role:</strong> ${user.userType === 'warehouse_manager' ? 'Warehouse Manager' : 'Procurement Officer'}</p>
            ${user.warehouse ? `<p style="margin: 5px 0;"><strong>Assigned Warehouse:</strong> ${user.warehouse.name}</p>` : ''}
          </div>
          <p>Please note that you will be required to change your password upon your first login.</p>
          <p>If you have any questions, please contact your administrator.</p>
          <p>Thank you,<br>Warehouse Management System Team</p>
        </div>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Credentials sent successfully to the user's email."
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to send credentials. Please try again.",
      error: error.message
    });
  }
});

module.exports = { sendUserCredentials };