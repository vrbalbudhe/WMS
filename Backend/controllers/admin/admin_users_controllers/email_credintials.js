const prisma = require("../../../lib/prisma");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");

const sendCredentials = asyncHandler(async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.MAIL_EMAIL,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"WMS Admin" <${process.env.MAIL_EMAIL}>`,
            to: email,
            subject: "Your WMS Credentials",
            text: `Here are your credentials:\nEmail: ${user.email}\nPassword: ${user.password}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Credentials sent to email."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while sending credentials",
            error: error.message
        });
    }
});

module.exports = { sendCredentials };
