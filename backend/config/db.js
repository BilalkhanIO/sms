// backend/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000 // 10 seconds
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
