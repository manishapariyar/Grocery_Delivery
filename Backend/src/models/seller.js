import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
    },
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    shopDescription: {
      type: String,
      default: "",
    },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
    profileImage: {
      type: String, // store image URL or filename
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    agreed: { // Privacy Policy / Terms checkbox
      type: Boolean,
      required: true,
      default: false,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    role: {
      type: String,
      default: "seller", // could also be "admin" or "customer"
    },
  },
  { timestamps: true }
);

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
