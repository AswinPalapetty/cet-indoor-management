import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
        trim:true
    },

    staffno : {
        type:String,
        required:true,
        unique:true
    },

    mobile : {
        type:String,
        required:true
    },

    email : {
        type:String,
        required:true,
        unique:true
    },

    password : {
        type:String,
        required:true
    }
}, {timestamps:true});

export default mongoose.model('staffs',userSchema,"staffs")