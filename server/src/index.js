import express from "express"
import cors from "cors"
import { existsSync, mkdirSync } from "fs";
import student from "./routes/student.js"
import staff from "./routes/staff.js"
import { config } from 'dotenv'
import connectDB from "../config/connection.js"
import { initScheduler } from "../scheduler/scheduler.js"
import { updateOrderFine } from "../helpers/student-helpers.js"
import { sendEmail, updateAttendanceStatus, updateSlot } from "../helpers/staff-helpers.js"
import { announcementUpload, imageUpload } from "../config/multer.js";

//dotenv configuration
config()

//mongodb configuration
connectDB()

//sendEmail();
initScheduler();
//updateOrderFine()

//Create directory if doesn't exist
const dirs = ["./public/images", "./public/announcements"];
dirs.forEach((dir) => {
    if (!existsSync(dir))
        mkdirSync(dir, { recursive: true });
})

const app = express()

app.use(cors(
    {
        origin: process.env.CLIENT_URL.split(' '),
        methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
        credentials: true
    }
));
app.use(express.json());
app.use("/student", student);
app.use("/staff", staff);
app.use('/images', express.static('./public/images'));
app.use('/announcement-files', express.static('./public/announcements'));
console.log(process.env.STAGE)
if (!process.env.STAGE || process.env.STAGE === 'dev') {
    app.post('/image-upload', imageUpload.any('files'), (_req, res) => res.json({ success: true }))
    app.post('/announcement-upload', announcementUpload.any('files'), (_req, res) => res.json({ success: true }))
}

app.listen(process.env.PORT, () => {
    console.log("Server is running.");
})