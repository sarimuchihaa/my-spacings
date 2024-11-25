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
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ROUTES
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

export { app };