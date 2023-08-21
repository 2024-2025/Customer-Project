const mongoose = require('mongoose');
const joi = require('joi');
const SaleSTore = new mongoose.Schema({
    CustomerID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"customer"

    },
    ItemID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "item"

    },
    
    price: {
        type: Number,
        required: true,


    },
   

}, { timestamps: true });





const SaleModel = mongoose.model("sale", SaleSTore);

const SaleValidation = (SV) => {
    const salevalidation = joi.object({
        CustomerID:joi.string().required(),
        ItemID: joi.string().required(),
        price: joi.number().required()
    })
    return salevalidation.validate(SV)
}

module.exports = {
    SaleValidation,
    SaleModel
}
