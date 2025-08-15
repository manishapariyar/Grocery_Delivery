import express from 'express';
import { placeOrderCOD, getAllOrders, getUserOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authCredentials.js';
import SellerCredentials from '../middleware/sellerCredentials.js';


const orderRouter = express.Router();


orderRouter.post('/cod', authMiddleware, placeOrderCOD);
orderRouter.get('/:userId', authMiddleware, getUserOrders);
orderRouter.get('/seller', SellerCredentials, getAllOrders);


export default orderRouter;