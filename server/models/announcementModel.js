import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    filename:{
        type:String
    }
},{timestamps:true})

export default mongoose.model('announcements',schema,"announcements")