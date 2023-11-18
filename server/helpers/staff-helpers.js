import staffModel from "../models/staffModel.js";
import studentModel from '../models/studentModel.js';
import AttendanceModel from '../models/AttendanceModel.js'
import equipmentsModel from '../models/equipmentsModel.js'
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const saltRounds = 10; //for password hashing

export const staffSignup = async (staffData) => {
    try {
        //Check if the user already exists
        const existingUser = await staffModel.findOne({ staffno: staffData.staffno });

        if (existingUser) {
            return { message: "Account already exists for this Staff Number.", token: null };
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(staffData.password, saltRounds);

            // Save the user
            const user = await new staffModel({ ...staffData, password: hashedPassword }).save();

            const token = await JWT.sign({ _id: user._id }, process.env.TOKEN, {
                expiresIn: "7d"
            })

            // //select specific keys and returning
            // const selectedKeys = ['name', 'email', 'admission', 'mobile'];

            // const selectedUserData = {};
            // selectedKeys.forEach(key => {
            //     selectedUserData[key] = user[key];
            // });

            return { message: "Account created successfully.", token };
        }
    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
};

export const staffLogin = async (staffData) => {
    try {
        const existingUser = await staffModel.findOne({ staffno: staffData.staffno });

        if (existingUser) {
            const password_status = await bcrypt.compare(staffData.password, existingUser.password)
            if (password_status) {
                const token = JWT.sign({ _id: existingUser._id }, process.env.TOKEN, {
                    expiresIn: "7d"
                })
                return {
                    message: "Login successfull",
                    token
                }
            }
            else {
                return { message: "Incorrect password", token: null }
            }
        }
        else {
            return { message: "Staff Number is not registered", token: null }
        }
    } catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const findStudent = async (admission) => {
    try {
        const includedFields = ['name', 'department', 'mobile'];
        const student = await studentModel.findOne({ admission }).select(includedFields.join(' '));

        if (student) {
            return { student, message: "Student found." }
        }
        else {
            return { student: null, message: "Student not found." }
        }
    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const markIndoorAttendance = async (studentData) => {
    try {
        const student = await AttendanceModel.findOne({ admission: studentData.admission, today: true, type: 'indoor' });
        if (student) {
            return { studentAttendance: null, message: "Attendance already marked." }
        }
        else {
            // Save indoor attendance
            const studentAttendance = await new AttendanceModel({ ...studentData, today: true, type: 'indoor' }).save();

            // fetch todays attendance
            // const todaysAttendance = await AttendanceModel.find({ today : true });
            return { studentAttendance, message: "Attendance marked successfully." };

        }
    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const fetchIndoorAttendance = async () => {
    try {
        const todaysAttendance = await AttendanceModel.find({ today: true, type: 'indoor' });
        if (todaysAttendance) {
            return { todaysAttendance }
        }
        else {
            return { todaysAttendance: null }
        }
    }
    catch (error) {
        console.error(error);
    }
}

export const markGymAttendance = async (studentData) => {
    try {
        const student = await AttendanceModel.findOne({ admission: studentData.admission, today: true, type: 'gym' });
        if (student) {
            return { studentAttendance: null, message: "Attendance already marked." }
        }
        else {
            // Save indoor attendance
            const studentAttendance = await new AttendanceModel({ ...studentData, today: true, type: 'gym' }).save();
            return { studentAttendance, message: "Attendance marked successfully." };

        }
    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const fetchGymAttendance = async () => {
    try {
        const todaysAttendance = await AttendanceModel.find({ today: true, type: 'gym' });
        if (todaysAttendance) {
            return { todaysAttendance }
        }
        else {
            return { todaysAttendance: null }
        }
    }
    catch (error) {
        console.error(error);
    }
}

export const addEquipment = async (equipmentData) => {
    try {

        // Save equipment details
        const equipment = await new equipmentsModel({ ...equipmentData}).save();
        return { equipment, message: "New equipment added." };

    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const getEquipments = async ()=>{
    try {
        const equipments = await equipmentsModel.find({});
        if (equipments) {
            return { equipments }
        }
        else {
            return { equipments: [] }
        }
    }
    catch (error) {
        console.error(error);
    }
}