import mongoose from "mongoose";
import "dotenv/config";

const mongoConnection = async () => {
    try {
        const url = process.env.MONGO_URI;
        const connectDb = await mongoose.connect(url)
        console.log(`MongoDB connected: ${connectDb.connection.host}`);
    } catch (err) {
        throw new Error(err);
    }
}

export default mongoConnection;