const mongoose = require('mongoose');
const joi = require('joi');
const UserSchema = new mongoose.Schema({
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    UserName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: false,
        default: "User",
        enum: ["User", "Admin"]

    },
    Status: {
        type: String,
        required: false,
        default: "Active",
        enum: ["Active", "Blocked", "Pending"]
    }


}, { timestamps: true });


const UserModel = mongoose.model('user', UserSchema);

const UserValidation = (UV) => {
    let uservalidation = joi.object({
        CustomerID: joi.string().required(),
        UserName: joi.string().required(),
        Email: joi.string().required().email(),
        Password: joi.string().required(),

    })
    return uservalidation.validate(UV)
}


module.exports = {
    UserValidation,
    UserModel
}