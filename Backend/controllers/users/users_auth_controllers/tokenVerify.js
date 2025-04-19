// Backend\controllers\users\users_auth_controllers\tokenVerify.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const tokenVerify = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.token;
    
    console.log("Token verification request, cookie exists:", !!token);
    
    if (!token) {
      return res.status(200).json({
        success: false,
        message: 'No token found',
        payload: null
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("Token verified successfully:", decoded);
      
      return res.status(200).json({
        success: true,
        message: 'Token is valid',
        payload: decoded
      });
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.status(200).json({
        success: false,
        message: 'Invalid token: ' + jwtError.message,
        payload: null
      });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(200).json({
      success: false,
      message: 'Error processing token: ' + error.message,
      payload: null
    });
  }
});

module.exports = { tokenVerify };