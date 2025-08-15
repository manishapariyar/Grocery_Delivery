
import express from 'express';
import authMiddleware from '../middleware/authCredentials.js';
import { updateCart } from '../controllers/cartController.js';


const cartRouter = express.Router();

cartRouter.post('/update', authMiddleware, updateCart)

export default cartRouter;