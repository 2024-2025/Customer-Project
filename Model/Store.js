const mongoose = require('mongoose');
const joi = require('joi');
const StoreSchema = new mongoose.Schema({
    ItemID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "item"

    },
    Quantity: {
        type: Number,
        required: true,


    },

    price: {
        type: Number,
        required: true,


    },


}, { timestamps: true });


const StoreModel = mongoose.model("store", StoreSchema);

const StoreValidation = (SV) => {
    const storevalidation = joi.object({
        ItemID: joi.string().required(),
        Quantity: joi.number().required(),
        price: joi.number().required()
    })
    return storevalidation.validate(SV)
}

module.exports = {
    StoreValidation,
    StoreModel
}



