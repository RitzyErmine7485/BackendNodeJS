const { Schema, model, Types } = require("mongoose")

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    subject: {
        type: [String],
        required: false
    }
}, {
    timestamps: true
})

module.exports = model("User", userSchema)
