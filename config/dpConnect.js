import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        console.log('mongo Db connected');
    } catch (error) {
        console.log('db connection error', error);
        
    }
}