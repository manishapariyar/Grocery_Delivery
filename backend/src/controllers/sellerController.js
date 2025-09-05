import Seller from "../models/Seller.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};


// Signup
export const sellerSignup = async (req, res) => {
  try {
    const { name, email, password, phone, shopName, agreed } = req.body;

    // required fields check
    if (!name || !email || !password || !phone || !shopName) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    // terms checkbox validation
    if (!agreed) {
      return res.status(400).json({ success: false, message: "You must agree to the Seller Terms and Privacy Policy." });
    }

    // check if seller already exists
    const existing = await Seller.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Seller already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create seller
    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      phone,
      shopName
    });

    await newSeller.save();

    // generate JWT
    const token = jwt.sign({ id: newSeller._id, email, role: "seller" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("sellerToken", token, cookieOptions);
    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newSeller,
      token,
    });

  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

    const token = jwt.sign({ id: seller._id, email: seller.email, role: "seller" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("sellerToken", token, cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: seller,
      token,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Logout
export const sellerLogout = (req, res) => {
  try {
    res.clearCookie("sellerToken", cookieOptions);
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Auth check
export const sellerIsAuthenticated = async (req, res) => {
  try {
    let token = req.cookies?.sellerToken;
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const seller = await Seller.findById(decoded.id).populate("products");
    if (!seller) return res.status(401).json({ success: false, message: "Not authenticated" });

    return res.status(200).json({
      success: true,
      message: "Seller is authenticated",
      user: seller,
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
