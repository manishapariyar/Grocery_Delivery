import User from "../models/User.js";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { oauth2Client } from "../config/googleConfig.js";
import axios from "axios";


const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',  // Ensure cookie is available on all routes
};



// Step 1: Handle Google login from frontend POST
export const googleLoginCallback = async (req, res) => {
  try {
    const code = req.body.code; // get code from POST body
    if (!code) return res.status(400).json({ success: false, message: "Code not provided" });

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: 'https://grosha-mart.vercel.app/'
    });

    oauth2Client.setCredentials(tokens);

    // Get user info
    const { data } = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const { email, name, picture, id } = data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = await User.create({
        name,
        email,
        avatar: picture,
        google: {
          providerId: id,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        },
      });
    } else {
      // Update existing user's Google info
      user.google = {
        providerId: id,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || user.google?.refreshToken,
      };
      user.avatar = picture;
      await user.save();
    }

    const token = generateAuthToken(user._id);
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Google login successful",
      user,
    });

  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ success: false, message: "Google login failed", error: error?.message });
  }
};





//register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }

  try {
    const exits = await User.findOne({ email });
    if (exits) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" })
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });

    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    const token = generateAuthToken(newUser._id);
    res.cookie('token', token, cookieOptions);
    res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });



  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: 'Error registering user', error: error?.message || error });
  }


}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
  }
  try {
    const user
      = await User
        .findOne({ email })

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateAuthToken(user._id);
    res.cookie('token', token, cookieOptions);
    res.status(200).json({ success: true, message: 'Login successful', user });

  }
  catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error logging in',
      error
    });
  }
}

//logout user
export const logoutUser = async (req, res) => {
  try {

    res.clearCookie('token', cookieOptions);
    res.status(200).json({ success: true, message: 'User logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Error logging out user', error: error?.message || error });
  }

};


//user profile
export const userProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID not provided' });
    }

    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Error fetching user profile', error: error?.message || error });
  }
};

