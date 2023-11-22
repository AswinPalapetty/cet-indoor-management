import studentModel from "../models/studentModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import equipmentsModel from "../models/equipmentsModel.js";
import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";

const saltRounds = 10; //for password hashing

export const getStudent = async (userId) => {
    const student = await studentModel.findById(userId);
    return student;
}

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

            return { message: "Account created successfully.", token };
        }
    } catch (error) {
        throw error; // Handle or log the error as needed
    }
};

export const studentLogin = async (studentData) => {
    try {
        const existingUser = await studentModel.findOne({ admission: studentData.admission });

        if (existingUser) {
            const password_status = await bcrypt.compare(studentData.password, existingUser.password)
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
};

export const addToCart = async (equipmentId, userId) => {
    try {
        const cartItemExist = await cartModel.findOne({ equipment: equipmentId, user: userId })
        const orderItemExist = await orderModel.findOne({ equipments: { $elemMatch: { equipment: equipmentId, status: 'In hand' } }, student: userId })
        if (cartItemExist)
            return { cartItem: null, message: "Equipment already exist in your cart." }
        if (orderItemExist)
            return { cartItem: null, message: "Equipment already rented. Please return it before due date." }
        const cartItem = await new cartModel({ equipment: equipmentId, user: userId, quantity: 1 }).save();
        return { cartItem, message: "Added to cart" }
    } catch (error) {
        throw error;
    }
};

export const getCartItems = async (userId) => {
    try {
        const cartData = await cartModel.find({ user: userId }).populate('equipment');
        return { cartData }

    } catch (error) {
        throw error;
    }
}

export const deleteItem = async (itemId) => {
    try {
        const result = await cartModel.findByIdAndDelete(itemId);
        return { result }
    } catch (error) {
        throw error;
    }
}

export const confirmOrder = async (order) => {
    try {
        order.student = new mongoose.Types.ObjectId(order.student)
        if (order.student.equals(order.user)) {
            delete order.user;
            const orderDetails = await new orderModel({ equipments: order.cartItems, student: order.student }).save();
            if (orderDetails) {
                for (const item of order.cartItems) {
                    await cartModel.deleteOne({ equipment: item.equipment });
                }
                return { orderDetails, message: "Equipments rented successfully. You can now collect the equipments from indoor court office" }
            }
            else {
                return { orderDetails: null, message: "Equipments renting failed." }
            }
        }
        else {
            return { orderDetails: null, message: "User not found." }
        }

    } catch (error) {
        console.error(error);
    }
}

export const getOrders = async (student) => {
    try {
        const orders = await orderModel.aggregate([
            {
                $match: { student: student._id }
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
                $project: {
                    quantity: "$equipments.quantity",
                    fine: "$equipments.fine",
                    dueDate: "$equipments.dueDate",
                    status: "$equipments.status",
                    equipment: {
                        _id: "$equipments.equipment",
                        equipment: "$equipmentData.equipment",
                        stock: "$equipmentData.stock",
                        filename: "$equipmentData.filename"
                    }
                }
            }
        ])
        return orders;

    } catch (error) {
        console.error(error);
    }
}

export const updateCartQuantity = async (equipmentId, quantity, user) => {
    try {

        const equipment = await equipmentsModel.findById(equipmentId);
        const cart = await cartModel.findOne({ equipment: equipmentId })
        if (cart.quantity + quantity < 1)
            return { status: false }
        if (equipment.stock < cart.quantity + quantity)
            return { status: false, message: `Only ${equipment.stock} left!!!` }
        const updatedCart = await cart.updateOne({ $inc: { quantity } }, { new: true })
        return { status: true, message: "Quantity updated."}

    } catch (error) {
        throw error;
    }
}