import staffModel from "../models/staffModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const saltRounds = 10; //for password hashing

export const staffSignup = async (staffData)=>{
    try{
        //Check if the user already exists
        const existingUser = await staffModel.findOne({ staffno: staffData.staffno });

        if (existingUser) {
            return { message: "Account already exists for this Staff Number.", token: null };
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(staffData.password, saltRounds);

            // Save the user
            const user = await new staffModel({ ...staffData, password: hashedPassword }).save();

            const token = await JWT.sign({ _id: user._id }, "7327bc47d4nd3mfds&*^@4wer", {
                expiresIn: "7d"
            })

            // //select specific keys and returning
            // const selectedKeys = ['name', 'email', 'admission', 'mobile'];

            // const selectedUserData = {};
            // selectedKeys.forEach(key => {
            //     selectedUserData[key] = user[key];
            // });

            return { message: "Account created successfully.", token};
        }
    }
    catch (error) {
        throw error; // Handle or log the error as needed
    }
};

export const staffLogin = async (staffData)=>{
    try {
        const existingUser = await staffModel.findOne({ staffno: staffData.staffno });

        if (existingUser) {
            const password_status = await bcrypt.compare(staffData.password,existingUser.password)
            if (password_status) {
                const token = await JWT.sign({ _id: existingUser._id }, "7327bc47d4nd3mfds&*^@4wer", {
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