const express = require('express');
const { ItemValidation, ItemModel } = require('../Model/Item');
const { required } = require('joi');
const router = express.Router();
const { CustomerModel } = require('../Model/Customer')





router.get('/', async (req, res) => {

    const CustomerData = await ItemModel.find().populate({

        path: "CustomerID",
        module: "customer",
        select: "Name Phone"

    })

    res.send(CustomerData)
})


router.get('/:id', async (req, res) => {
    let { id } = req.params;
    let find = await ItemModel.findById(id)
    res.send(find)
})

router.post('/', async (req, res) => {
    try {

        let { error } = ItemValidation(req.body);
        if (error) return res.send(error.message);
        const Item = new ItemModel((req.body))
        const CustomerData = await CustomerModel.findOne({ _id: Item.CustomerID });
        if (!CustomerData) return res.send("CustomerID waa Qalad")

        const info = await Item.save();
        res.send({
            status: "Success",
            message: "Successfully Inserted Data Item",
            info: info

        })


    } catch (error) {
        res.send(error.message)
    }
})


router.put('/:id', async (req, res) => {
    let { id } = req.params;
    const p = await ItemModel.findByIdAndUpdate(id, (req.body), { new: true })
    res.send({
        status: "Success",
        message: "Successfully Update ItemData",
        info: p
    })
})


router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    const p2 = await ItemModel.findByIdAndDelete(id)
    res.send({
        status: "Success",
        message: "Successfully Delete ItemData",
        info: p2
    })
})
module.exports = router