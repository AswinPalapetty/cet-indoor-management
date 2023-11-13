import express from "express"
import cors from "cors"
import bcrypt from "bcrypt"
import student from "./routes/student.js" 
import {config} from 'dotenv'
import connectDB from "../config/connection.js"

//dotenv configuration
config()

//mongodb configuration
connectDB()

const app  = express()

app.use(cors());
app.use(express.json());
app.use("/student",student);

app.listen(3001, ()=>{
    console.log("Server is running on port 3001");
})