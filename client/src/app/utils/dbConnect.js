import mongoose from "mongoose";

// Connect to MongoDB
const dbConnect = () =>{
    try
    {
        mongoose.connect('mongodb+srv://abhishekdaszy:9437barun@cluster0.lznz5ws.mongodb.net/');
        console.log("connected to MongoDB");
    }
    catch(error)
    {
        console.log("MongoDB connection error" + error);
    }
}

export default dbConnect;