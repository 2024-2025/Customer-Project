const mongoose = require('mongoose');
const joi = require('joi');
const CustomerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,

    },
    Phone: {
        type: Number,
        required: true,
    },
    Gender: {
        type: String,
        required: true,
        enum: ["Female", "female", "Male", "male"]
    },
    Address: {
        type: String,
        required: true,
    },

    Status: {
        type: String,
        required: false,
        default: "Active",
        enum: ["Active", "Blocked", "Pending"]
    }

}, { timestamps: true });


const CustomerModel = mongoose.model('customer', CustomerSchema);


const CustomerValidation = (CV) => {
    const customervalidation = joi.object({
        Name: joi.string().required().max(40).min(3),
        Phone: joi.number().required(),
        Gender: joi.string().required(),
        Address: joi.string().required(),

    })

    return customervalidation.validate(CV)
}

module.exports = {
    CustomerValidation,
    CustomerModel
}