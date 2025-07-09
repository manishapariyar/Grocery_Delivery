import User from "../models/User";
import validator from "validator";
import passport from "passport";


const generateAuthToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
}
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
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None' });
    return res.status(200).json({ message: 'Google authentication successful', user });
  })(req, res);
}


//register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exits = new User.findOne({ email });
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
    await user.save();
    const token = user.generateAuthToken(user._id);
    res.status(201).json({ success: true, message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }

}


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user
      = await User
        .findOne({ email })
        .select('+password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = user.generateAuthToken(user._id);
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