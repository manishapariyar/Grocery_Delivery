

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

//seller login 
export const sellerLogin = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (password === process.env.ADMIN_PASSWORD && email === process.env.ADMIN_EMAIL) {
      const token = jwt.sign(
        { email, name, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      res.cookie('sellerToken', token, cookieOptions);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: { email, name, role: 'admin' },
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error("Error during seller login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

//seller logout
export const sellerLogout = (req, res) => {
  try {
    res.clearCookie('sellerToken', cookieOptions);
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Error during seller logout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


// seller is authenticated
export const sellerIsAuthenticated = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Seller is authenticated",
      user: {
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error("Error checking seller authentication:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}