import jwt from 'jsonwebtoken';

const SellerCredentials = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.email === process.env.ADMIN_EMAIL) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden access' });
    }

  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}
export default SellerCredentials;