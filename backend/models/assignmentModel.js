const { Schema, model, Types } = require('mongoose')

const assignmentSchema = Schema({
    user: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    subject: {
        type: String,
        required: [true, 'Subject is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    }
}, {
    timestamps: true
})

module.exports = model('Assignment', assignmentSchema)
