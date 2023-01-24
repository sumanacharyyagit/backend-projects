const mongoose = require('mongoose');
const {Schema}  = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            default: null,
            required: true,
        },
        lastname: {
            type: String,
            default: null,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Required"],
        },
        password: {
            type: String,
            required: [true, "Required"],
        },
        token: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);