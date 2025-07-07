


import passport from "passport";


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
    res.cookie('token', token, { httpOnly: true, secure: true });
    return res.status(200).json({ message: 'Google authentication successful', user });
  })(req, res);
}



