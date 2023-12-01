import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema({
    type: {
        type:String,
        required:true
    },
    availability : {
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model('courts',schema,"courts")