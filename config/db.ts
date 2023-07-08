import mongoose from "mongoose";

const MONGO_URI: string = "mongodb+srv://Pranav:Pranav1!@shoplifter.k1oygu5.mongodb.net/TypescriptCRUD";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
