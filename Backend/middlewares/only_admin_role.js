const jwt = require('jsonwebtoken'); // You may use JWT for authentication
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const only_admin_role = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    console.log("- - - - ", token);
    if (!token) {
      return res.status(401).json({ error: 'Authentication token is required' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin_user = await prisma.admin.findUnique({
      where: {
        id: decoded?.id,
      },
    });

    if (!admin_user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (admin_user && decoded?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'You do not have admin permissions' });
    }
    req.user = admin_user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = only_admin_role;
