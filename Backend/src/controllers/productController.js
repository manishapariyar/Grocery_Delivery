import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/Product.js';

//Add product :/api/product/add
export const addProduct = async (req, res) => {
  try {
    // Assuming you have a Product model imported
    let productData = JSON.parse(req.body.productData);
    const images = req.files
    let imagesArray = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          folder: 'products',
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      images: imagesArray,
    });
    res.status(201).json({ message: 'Product added successfully', Product: productData });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }

}


// get product list : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ message: 'Product list fetched successfully', products });
  }
  catch (error) {
    res.status(500).json({ message: 'Error fetching product list', error: error.message });
  }
}


//get product by id : /api/product/:id
export const getProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.body.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product fetched successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
}

// delete product by id : /api/product/delete/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
}

//change product inStock : /api/product/changeStock/:id
export const changeProductStock = async (req, res) => {
  try {

    const { id, stock } = req.body;

    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product stock updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product stock', error: error.message });
  }

}