// Backend\controllers\users\users_auth_controllers\logout.js
const asyncHandler = require("express-async-handler");

const logout = asyncHandler(async (req, res) => {
    try {
        console.log("Logout request received");
        
        // Make sure these cookie settings match those used when setting the cookie
        res.clearCookie("token", {
            httpOnly: true,
            path: "/",
            sameSite: "Lax",
            secure: process.env.NODE_ENV === "production"
        });
        
        console.log("Cookie cleared successfully");
        
        return res.status(200).json({
            message: "Logout Successful",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "Logout Failed",
            success: false,
            error: error.message
        });
    }
});

module.exports = { logout };