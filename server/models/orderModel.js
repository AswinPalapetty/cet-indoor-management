import mongoose, { Schema } from "mongoose"

const equipmentSchema = new mongoose.Schema({
    equipment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'equipments'
    },
    quantity: {
        type: Number,
        required: true
    },
    fine: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
        default: function () {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 5); // Adding 5 days
            return currentDate;
        }
    },
    status: {
        type : String,
        enum : ['In hand','returned'],
        default : 'In hand'
    }
}, { _id: false })

const schema = new mongoose.Schema({
    equipments: {
        type: [equipmentSchema],
        required: true,
        default: []
    },
    student: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

export default mongoose.model('order', schema, "order")