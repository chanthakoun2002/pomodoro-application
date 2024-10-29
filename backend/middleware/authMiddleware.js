const jwt = require("jsonwebtoken");
const BlacklistedToken = require("../models/token");
const User = require("../models/user");
const dotenv = require("dotenv");
dotenv.config();

const authentication = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }
  
    try {
      const tokenFound = await BlacklistedToken.findOne({ token });
      if (tokenFound) {
        return res.status(401).json({ message: 'Token is blacklisted and cannot be used' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Access Denied Invalid Token' });
    }
  };
  
module.exports = authentication;