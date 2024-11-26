// IMPORTS
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/dbConnection.js";
import path from 'path';
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';


// CONFIGS
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();


// MIDDLEWARES
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


// ROUTES
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


// PRODUCTION
if (process.env.NODE_ENV === "production") {
    const __dirname = path.dirname(new URL(import.meta.url).pathname); // Resolve __dirname for ES modules
    const frontendPath = path.join(__dirname, "../frontend/build");  // Adjust to use 'build' if that's your folder

    app.use(express.static(frontendPath));  // Serve static files from the build directory
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendPath, "index.html"));  // Serve index.html for any route
    });
}

// DB Connection.
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server Running on port ${PORT} 😃`)
});