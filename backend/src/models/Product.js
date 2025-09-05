import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
    default: true,

  },
  images: {
    type: Array,
    required: true,
  },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
  // ratings: {
  //   type: [Number],
  //   default: [],
  // },
  // reviews: {
  //   type: [
  //     {
  //       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //       comment: { type: String, required: true },
  //       rating: { type: Number, required: true, min: 1, max: 5 },
  //       createdAt: { type: Date, default: Date.now },
  //     }
  //   ],
  //   default: [],
  // },
}, { timestamps: true, minimize: false });




const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
