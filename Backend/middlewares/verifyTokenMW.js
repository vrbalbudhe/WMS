// Backend\middlewares\verifyTokenMW.js (updated)
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Authentication token is required' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    let user;
    
    // Check if the token belongs to an admin or a regular user
    if (decoded.role === 'ADMIN') {
      user = await prisma.admin.findUnique({
        where: { id: decoded.id },
      });
    } else {
      user = await prisma.user.findUnique({
        where: { id: decoded.id },
        include: { warehouse: true }
      });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Attach user info to the request
    req.user = user;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ 
      success: false,
      message: 'Invalid or expired token',
      error: error.message
    });
  }
};

module.exports = verifyToken;