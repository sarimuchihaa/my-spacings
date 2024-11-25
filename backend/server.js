// IMPORTING
import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/dbConnection.js";
import { app } from "./app.js";
import path from 'path';
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();



// Route for root url ("/").
// app.get("/", (req, res) => {
//     res.send("Hello Sarim 😇");
// })

if (process.env.NODE_ENV === "production") 
{
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}


// DB Connection.
app.listen(PORT, () => {
    dbConnection();
    console.log(`Server Running on port ${PORT} 😃`)
});