// IMPORTING
import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';


// MIDDLEWARE
const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());


// ROUTES
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

export { app };