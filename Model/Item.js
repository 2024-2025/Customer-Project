const mongoose = require('mongoose');
const joi = require('joi');
const ItemSchema = new mongoose.Schema({
    ItemName: {
        type: String,
        required: true,
        ref: "customer"

    },
    CustomerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customer"
    },
    Type: {

        type: String,
        required: true,


    },
    Balance: {
        type: Number,
        required: false,
        default: "0"


    }
    , Status: {
        type: String,
        default: "UnPaid",
        enum: ["UnPaid", "PerceilPaid", "FullPaid"]
    }

}, { timestamps: true });



const ItemModel = mongoose.model("item", ItemSchema);

const ItemValidation = (IV) => {
    const itemvalidation = joi.object({
        CustomerID: joi.string().required(),
        ItemName: joi.string().required(),
        Type: joi.string().required(),
    })
    return itemvalidation.validate(IV)
}

module.exports = {
    ItemValidation,
    ItemModel
}