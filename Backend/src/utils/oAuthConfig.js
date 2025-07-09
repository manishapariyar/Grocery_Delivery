import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const configurePassport = () => {
  // Configure Passport.js for Google OAuth
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
  },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({
          $or: [
            { 'google.providerId': profile.id },
            { email: profile.emails[0]?.value },
          ],
        });

        if (user) {
          if (!user.google.providerId) {
            user.google = {
              providerId: profile.id,
              accessToken,
              refreshToken,
            };
            await user.save();
          }
          return done(null, user);
        } else {
          // Create a new user if not found
          user = new User({
            name: profile.displayName,
            email: profile.emails[0]?.value,
            google: {
              providerId: profile.id,
              accessToken,
              refreshToken,
            },
          });
          await user.save();
          return done(null, user);
        }

      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  ));


  // Configure Passport.js for Facebook OAuth
  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_APP_ID,
  //   clientSecret: process.env.FACEBOOK_APP_SECRET,
  //   callbackURL: '/api/auth/facebook/callback',
  //   profileFields: ['id', 'displayName', 'emails', 'picture.type(large)'],
  // },
  //   async (accessToken, refreshToken, profile, done) => {
  //     try {
  //       // Check if user already exists
  //       let user = await User.findOne({ 'facebook.providerId': profile.id }) || (email && await User.findOne({ email }));
  //       if (!user) user = new User({ name: profile.displayName, email });
  //       user.facebook = { providerId: profile.id, accessToken, refreshToken };
  //       await user.save();
  //       return done(null, user);
  //     } catch (error) {
  //       console.error('Facebook OAuth error:', error);
  //       return done(error, null);
  //     }
  //   }
  // ));
}

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error, null);
  }
});


export default configurePassport;