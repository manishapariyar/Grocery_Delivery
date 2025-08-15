import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRouter from './routes/authRouter.js';
import session from 'express-session';
import passport from 'passport';
import configurePassport from './utils/oAuthConfig.js';
import sellerRouter from './routes/sellerRouter.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import addressRouter from './routes/addressRouter.js';
import orderRouter from './routes/orderRouter.js';

const app = express();



//middleware
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('uploads'));
app.use(cookieParser());
configurePassport();




app.use(session({
  secret: process.env.SESSION_SECRET ||
    'default_secret_key',
  resave: false,
  saveUninitialized: true,

}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).send({ message: "Welcome to the E-commerce API" });
})

app.use('/api/auth/user', authRouter)
app.use('/api/auth/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
export default app;