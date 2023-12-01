import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema({
    slots: {
        type:Object,
        required:true
    }
},{timestamps:true})

export default mongoose.model('slots',schema,"slots")