import mongoose, { Schema } from "mongoose"

const schema = new mongoose.Schema({
    student: {
        type:Schema.Types.ObjectId,
        required:true,
        ref:'students'
    },
    court : {
        type:String,
        required:true
    },
    slot : {
        type:String,
        required:true
    },
    today : {
        type : Boolean,
        required : true
    }
},{timestamps:true})

export default mongoose.model('booking',schema,"booking")