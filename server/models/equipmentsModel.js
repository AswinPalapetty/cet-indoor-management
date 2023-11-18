import mongoose from "mongoose"

const schema = new mongoose.Schema({
    equipment:{
        type:String,
        required:true,
        trim:true
    },
    stock:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('equipments',schema,"equipments")