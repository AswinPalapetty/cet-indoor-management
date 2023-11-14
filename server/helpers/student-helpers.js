import studentModel from "../models/studentModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const saltRounds = 10; //for password hashing

export const studentSignup = async (studentData) => {
    try {
        // Check if the user already exists
        const existingUser = await studentModel.findOne({ admission: studentData.admission });

        if (existingUser) {
            return { message: "Account already exists for this Admission Number.", token: null };
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(studentData.password, saltRounds);

            // Save the user
            const user = await new studentModel({ ...studentData, password: hashedPassword }).save();

            const token = await JWT.sign({ _id: user._id }, process.env.TOKEN, {
                expiresIn: "7d"
            })

            //select specific keys and returning
            // const selectedKeys = ['name', 'email', 'admission', 'mobile'];

            // const selectedUserData = {};
            // selectedKeys.forEach(key => {
            //     selectedUserData[key] = user[key];
            // });

            return { message: "Account created successfully.", token};
        }
    } catch (error) {
        throw error; // Handle or log the error as needed
    }
};

export const studentLogin = async (studentData) => {
    try {
        const existingUser = await studentModel.findOne({ admission: studentData.admission });

        if (existingUser) {
            const password_status = await bcrypt.compare(studentData.password,existingUser.password)
            if (password_status) {
                const token = await JWT.sign({ _id: existingUser._id }, process.env.TOKEN, {
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
            return { message: "Admission Number is not registered", token: null }
        }
    } catch (error) {
        throw error; // Handle or log the error as needed
    }
};
