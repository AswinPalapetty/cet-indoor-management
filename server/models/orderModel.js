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
        default: () => {
            const currentDate = new Date(new Date().setHours(0, 0, 0, 0))
            return currentDate.setDate(currentDate.getDate() + 5)
        }
    },
    finePaidDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['In hand', 'returned'],
        default: 'In hand'
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