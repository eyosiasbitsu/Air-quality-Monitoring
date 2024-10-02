const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const tokenWithBeare = req.header('Authorization');

  if (!tokenWithBeare) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }
  const token = tokenWithBeare.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = authMiddleware;