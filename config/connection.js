import mongoose from "mongoose";

export const connectMongoDB = async (connectionURL) => {
  try {
    const connection=await mongoose.connect(connectionURL);
    console.log("Connected to MongoDB");
    return connection; 
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};