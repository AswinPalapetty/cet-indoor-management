import express from "express"
import cors from "cors"
import student from "./routes/student.js"
import staff from "./routes/staff.js"
import { config } from 'dotenv'
import connectDB from "../config/connection.js"
import { initScheduler } from "../scheduler/scheduler.js"
import { updateOrderFine } from "../helpers/student-helpers.js"
import { updateAttendanceStatus } from "../helpers/staff-helpers.js"

//dotenv configuration
config()

//mongodb configuration
connectDB()

initScheduler();
//updateOrderFine()

const app = express()

app.use(cors());
app.use(express.json());
app.use("/student", student);
app.use("/staff", staff);
app.use('/images', express.static('./public/images'));


app.listen(process.env.PORT, () => {
    console.log("Server is running.");
})