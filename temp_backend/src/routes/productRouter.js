import express from 'express';
import { addProduct, productList, getProduct, deleteProduct, changeProductStock } from '../controllers/productController.js';
import { upload } from '../config/multer.js'
import SellerCredentials from '../middleware/sellerCredentials.js';

const productRouter = express.Router();


// productRouter.post('/add', upload.array([images]),
//   SellerCredentials, addProduct);
productRouter.post('/add', upload.array('images'), SellerCredentials, addProduct);
productRouter.get('/list', productList);
productRouter.get('/:id', getProduct);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.put('/changeStock/:id', changeProductStock);


export default productRouter;