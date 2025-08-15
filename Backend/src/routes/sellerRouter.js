import express from 'express';
import { sellerLogin, sellerLogout, sellerIsAuthenticated } from '../controllers/sellerController.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/logout', sellerLogout);
sellerRouter.get('/is-auth', sellerIsAuthenticated);


export default sellerRouter;