import mongoose from "mongoose";



const oauthSchema = new mongoose.Schema({
  providerId: { type: String, required: true },
  accessToken: String,
  refreshToken: String,
}, { _id: false });




const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: {
    type: String,
    required: function () {
      return !(this.google?.providerId || this.facebook?.providerId);
    },
  },
  avatar: { type: String },        // optional: store Google profile picture
  cartItems: { type: Object, default: {} },
  google: oauthSchema,             // providerId, accessToken, refreshToken
  facebook: oauthSchema,
}, { minimize: false, timestamps: true });


const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;