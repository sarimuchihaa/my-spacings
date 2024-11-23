import mongoose from "mongoose";

const dbConnection = async () => {
   try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console. log("MongoDB connected 😇");
   } catch (error) {
     console.log("Error connecting to MongoDB", error.message);
   }
};

export default dbConnection;