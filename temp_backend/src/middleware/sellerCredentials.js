import jwt from "jsonwebtoken";
import Seller from "../models/Seller.js";

const SellerCredentials = async (req, res, next) => {
  try {
    // 1. Get token from cookie or header
    let token = req.cookies?.sellerToken;
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find seller in DB
    const seller = await Seller.findById(decoded.id);
    if (!seller) {
      return res.status(401).json({ success: false, message: "Seller not found" });
    }

    // 4. Attach seller to request object
    req.user = seller;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

export default SellerCredentials;
