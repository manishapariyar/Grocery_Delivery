import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

import authRouter from "./routes/authRouter.js";
import sellerRouter from "./routes/sellerRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import addressRouter from "./routes/addressRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();


// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

// API routes
app.use("/api/auth/user", authRouter);
app.use("/api/auth/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);


// Catch-all route for React Router
app.get('/', (req, res) => {
  res.send("welcome to Grosha Backend")
});

export default app;
