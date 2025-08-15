import express from 'express';
import authMiddleware from '../middleware/authCredentials.js';
import { addAddress, getAllAddresses } from '../controllers/addressController.js';


const addressRouter = express.Router();

addressRouter.post('/add', authMiddleware, addAddress);
addressRouter.get('/list', authMiddleware, getAllAddresses);

export default addressRouter;