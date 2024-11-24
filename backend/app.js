// IMPORTING
import express from "express";
import cors from "cors"; 
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js';


// MIDDLEWARE
const app = express();
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());


// ROUTES
app.use("/api/users", userRouter);

export { app };