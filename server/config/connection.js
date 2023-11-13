import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://aswin-2001:palapetty@cluster0.4zdawew.mongodb.net/cet-indoor-management") 
        console.log("Connected to mongodb database "+conn.connection.host)
    }
    catch(error){
        console.error("mongodb error :: "+error)
    }
}

export default connectDB;