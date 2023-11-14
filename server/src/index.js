import express from "express"
import cors from "cors"
import student from "./routes/student.js"
import staff from "./routes/staff.js" 
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
app.use("/staff",staff);

app.listen(process.env.PORT, ()=>{
    console.log("Server is running.");
})