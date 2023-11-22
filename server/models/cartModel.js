import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema({
    user: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'students'
    },
    equipment : {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'equipments'
    },
    quantity : {
        type:Number,
        required:true
    }
},{timestamps:true})

export default mongoose.model('cart',schema,"cart")