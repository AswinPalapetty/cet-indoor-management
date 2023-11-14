import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DB) 
        console.log("Connected to mongodb database "+conn.connection.host)
    }
    catch(error){
        console.error("mongodb error :: "+error)
    }
}

export default connectDB;