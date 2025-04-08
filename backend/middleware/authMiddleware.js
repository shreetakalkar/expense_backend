const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  console.log('Received headers:', req.headers);
  
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(403).json({ msg: 'Authorization header missing' });
  }


  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('Malformed Authorization header:', authHeader);
    return res.status(403).json({ msg: 'Authorization header format should be: Bearer <token>' });
  }

  const token = parts[1];
  console.log('Extracted token:', token);
  
  if (!token) {
    return res.status(403).json({ msg: 'Token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Invalid token' });
  }
};