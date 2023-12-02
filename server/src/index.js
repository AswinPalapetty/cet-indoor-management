import express from "express"
import cors from "cors"
import student from "./routes/student.js"
import staff from "./routes/staff.js"
import { config } from 'dotenv'
import connectDB from "../config/connection.js"
import { initScheduler } from "../scheduler/scheduler.js"
import { updateOrderFine } from "../helpers/student-helpers.js"
import { sendEmail, updateAttendanceStatus, updateSlot } from "../helpers/staff-helpers.js"

//dotenv configuration
config()

//mongodb configuration
connectDB()

//sendEmail();
initScheduler();
//updateOrderFine()

const app = express()

app.use(cors(
    {
        origin:["https://cet-indoor-management-server.vercel.app/"],
        methods: ["POST","GET"],
        credentials: true
    }
));
app.use(express.json());
app.use("/student", student);
app.use("/staff", staff);
app.use('/images', express.static('./public/images'));
app.use('/announcement-files', express.static('./public/announcements'));

app.listen(process.env.PORT, () => {
    console.log("Server is running.");
})