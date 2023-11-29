import staffModel from "../models/staffModel.js";
import studentModel from '../models/studentModel.js';
import AttendanceModel from '../models/AttendanceModel.js'
import equipmentsModel from '../models/equipmentsModel.js'
import orderModel from '../models/orderModel.js'
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import fs from "fs";
import mongoose from "mongoose";
import announcementModel from "../models/announcementModel.js";

const saltRounds = 10; //for password hashing

export const getStaff = async (userId) => {
    const staff = await staffModel.findById(userId);
    return staff;
}

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
        const equipment = await new equipmentsModel({ ...equipmentData }).save();
        return { equipment, message: "New equipment added." };

    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const updateEquipment = async (equipmentData) => {
    try {
        const id = new mongoose.Types.ObjectId(equipmentData.id);
        // Update equipment details
        await equipmentsModel.findByIdAndUpdate(
            id,
            { $set: { equipment: equipmentData.equipment, stock: equipmentData.stock } })
        const equipments = await getEquipments();
        return { ...equipments, message: "Updated succcessfully." };

    } catch (error) {
        throw error;
    }
}

export const deleteEquipment = async (equipmentData) => {
    try {
        const filePath = './public/images/' + equipmentData.filename;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log(`File deleted: ${filePath}`);
            }
        });

        const id = new mongoose.Types.ObjectId(equipmentData.id);
        await equipmentsModel.findByIdAndDelete(id);
        const equipments = await getEquipments();
        return { ...equipments, message: "Deleted succcessfully." };
    } catch (error) {
        throw error;
    }
}

export const getEquipments = async () => {
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
        throw error;
    }
}

export const getOrders = async () => {
    try {
        const orders = await orderModel.aggregate([
            {
                $match: {
                    "equipments.status": "In hand"
                }
            },
            {
                $unwind: "$equipments" //array in collection order
            },
            {
                $lookup: {
                    from: "equipments", // collection
                    localField: "equipments.equipment", //equipment id in array named equipments
                    foreignField: "_id",
                    as: "equipmentData"
                }
            },
            {
                $unwind: "$equipmentData"
            },
            {
                $lookup: {
                    from: "students",
                    localField: "student",
                    foreignField: "_id",
                    as: "studentData"
                }
            },
            {
                $unwind: "$studentData"
            },
            {
                $project: {
                    quantity: "$equipments.quantity",
                    fine: "$equipments.fine",
                    dueDate: "$equipments.dueDate",
                    status: "$equipments.status",
                    orderDate: "$createdAt",
                    equipment: {
                        _id: "$equipments.equipment",
                        equipment: "$equipmentData.equipment",
                        stock: "$equipmentData.stock",
                        filename: "$equipmentData.filename"
                    },
                    student: {
                        name: "$studentData.name",
                        admission: "$studentData.admission",
                        mobile: "$studentData.mobile",
                        email: "$studentData.email"
                    }
                }
            }
        ])
        return orders;

    } catch (error) {
        throw (error);
    }
}

export const updateAttendanceStatus = async () => {
    const attendance = await AttendanceModel.find({ today: true })
    attendance.map( async (student) => {
        await student.updateOne({today : false})
    })
    console.log("attendance status updated");
}

export const getAnnouncements = async () => {
    try {
        const announcements = await announcementModel.find({});
        if (announcements) {
            return { announcements }
        }
        else {
            return { announcements: [] }
        }
    }
    catch (error) {
        throw error;
    }
}

export const addAnnouncement = async (announcementData) => {
    try {

        // Save equipment details
        const announcement = await new announcementModel({ ...announcementData }).save();
        return { announcement, message: "New announcement added." };

    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
}

export const deleteAnnouncement = async (announcementData) => {
    try {
        const filePath = './public/announcements/' + announcementData.filename;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${err}`);
            } else {
                console.log(`File deleted: ${filePath}`);
            }
        });

        const id = new mongoose.Types.ObjectId(announcementData.id);
        await announcementModel.findByIdAndDelete(id);
        const announcements = await getAnnouncements();
        return { ...announcements, message: "Deleted succcessfully." };
    } catch (error) {
        throw error;
    }
}