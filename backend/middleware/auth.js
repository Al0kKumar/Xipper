import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // Get token from headers

  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Attach userId to request object
    next(); // Proceed to next middleware/controller
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
