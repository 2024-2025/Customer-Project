const express = require('express');
const router = express.Router();
const { SaleModel, SaleValidation } = require('../Model/Sales')
const { CustomerModel } = require('../Model/Customer')
const { ItemModel } = require('../Model/Item')
router.get('/', async (req, res) => {
    const Data = await SaleModel.find().populate({
        path: "CustomerID",
        module: "customer",
        select: "-_id Name"

    }).populate({
        path: "ItemID",
        module: "item",
        select: "-_id ItemName"
    })
    res.send(Data)
})






router.post('/', async (req, res) => {
    try {

        let { error } = SaleValidation(req.body);
        if (error) return res.send(error.message);




        const Sale = new SaleModel((req.body))

        const ItemData = await ItemModel.findOne({ _id: req.body.ItemID });
        if (!ItemData) return res.send('ItemID waa qalad')

        const CustomerData = await CustomerModel.findOne({ _id: ItemData.CustomerID })
        if (!ItemData) return res.send('CustomerID waa qalad')



        const price = ItemData.Balance - Sale.price

        let Currency = ""

        if (price == "0") {
            Currency = "FullPaid"

        }
        if (Sale.price < 1) {
            res.send('')
            return
        }


        else if (ItemData.Balance > Sale.price) {
            Currency = "PerCialPadi"
        }


        if (Sale.price > ItemData.Balance) {
            return res.send(`Lacagta laga rabo waa ${ItemData.Balance}`)
        }








        await ItemModel.findByIdAndUpdate(req.body.ItemID, ({
            Balance: price,
            Status: Currency
        }))


        const info = await Sale.save();
        res.send({
            status: "Success",
            message: "Successfully Inserted  and Update Data Sale",
            info: info

        })


    } catch (error) {
        res.send(error.message)
    }
})

module.exports = router