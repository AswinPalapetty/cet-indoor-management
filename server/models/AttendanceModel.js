import mongoose from "mongoose"

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    admission:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    intime:{
        type:String,
        required:true
    },
    today:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        enum:['gym','indoor'],
        required:true
    }
},{timestamps:true})

export default mongoose.model('attendance',schema,"attendance")