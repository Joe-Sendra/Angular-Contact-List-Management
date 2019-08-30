const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.role = decodedToken.role;
    if (req.role !== 'Admin') {
      return res.status(401).json({ message: 'You are not authorized, must be an administrator!'});
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'You are not authorized, must be an administrator!'});
  }
};
