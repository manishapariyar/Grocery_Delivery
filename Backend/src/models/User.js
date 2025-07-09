import mongoose from "mongoose";



const oauthSchema = new mongoose.Schema(
  {
    providerId: { type: String, required: true },   // Google “sub”, GitHub “id”, etc.
    accessToken: String,                             // short‑lived
    refreshToken: String,                            // store encrypted if you keep it
  },
  { _id: false }                                     // don’t create a separate _id
);



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: {
    type: String,
    required: function () {
      return !(
        this.google?.providerId ||
        this.facebook?.providerId
      );
    },
  },
  cartItems: {
    type: Object,
    default: {},
  },
  google: oauthSchema,
  facebook: oauthSchema,
}, { minimize: false, timestamps: true }
)

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;