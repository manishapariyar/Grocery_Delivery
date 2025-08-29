import User from "../models/User.js";
import validator from "validator";
import passport from "passport";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',  // Ensure cookie is available on all routes
};

export const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});



export const googleCallback = async (req, res) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Google authentication failed', error: err || info });
    }
    const token = user.generateAuthToken();

    res.cookie('token', token, cookieOptions);

    return res.status(200).json({ message: 'Google authentication successful', user });
  })(req, res);
}


//register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Registering user:', { name, email });
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


    const token = generateAuthToken(user._id);
    await user.save();
    res.cookie('token', token, cookieOptions);
    res.status(201).json({ success: true, message: 'User registered successfully', token, });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: 'Error registering user', error: error?.message || error });
  }


}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('Logging in user:', { email });
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
    res.status(200).json({ success: true, message: 'Login successful', token });
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
    const userId = req.user?.id || req.body?.userId;

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
