import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

// Add product : /api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;

    let imagesArray = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          folder: 'products',
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );
    const product = await Product.create({
      ...productData,
      images: imagesArray,
      seller: req.user._id, // from SellerCredentials
    });
    res.status(201).json({ success: true, message: 'Product added successfully', product });
  } catch (error) {
    console.error("Error while adding product:", error);
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message
    });
  }
};

// Get product list : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, message: 'Product list fetched successfully', products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product list', error: error.message });
  }
};

// Get product by ID : /api/product/:id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product fetched successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: error.message });
  }
};

// Delete product by ID : /api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};

// Change product stock : /api/product/changeStock/:id
export const changeProductStock = async (req, res) => {
  try {
    const { stock } = req.body;

    const product = await Product.findByIdAndUpdate(req.params.id, { stock }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    res.status(200).json({ success: true, message: 'Product stock updated successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product stock', error: error.message });
  }
};
