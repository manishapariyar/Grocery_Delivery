import express from 'express';
import { placeOrder, getAllOrders, getUserOrders, completeEsewaPayment } from '../controllers/orderController.js';
import authMiddleware from '../middleware/authCredentials.js';
import SellerCredentials from '../middleware/sellerCredentials.js';


const orderRouter = express.Router();


orderRouter.post('/order-place', authMiddleware, placeOrder);
orderRouter.get('/esewa/complete', completeEsewaPayment);

orderRouter.get('/user', authMiddleware, getUserOrders);
orderRouter.get('/seller', SellerCredentials, getAllOrders);




export default orderRouter;