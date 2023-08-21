const express = require('express');
const router = express.Router();
const { CustomerModel, CustomerValidation } = require('../Model/Customer')

router.get('/', async (req, res) => {


    const getin = await CustomerModel.find();
    res.send(getin);




});


router.get('/:id', async (req, res) => {

    let { id } = req.params

    let find = await CustomerModel.findById(id)
    res.send(find)





})

router.post('/', async (req, res) => {

    try {


        let { error } = CustomerValidation(req.body);
        if (error) return res.send(error.message);
        let insert = new CustomerModel((req.body));
        let info = await insert.save();
        res.send({
            status: "Success",
            message: "Successfully Inserted Data Customer",
            info: info
        });
    } catch (error) {
        res.send(error.message)

    }
})


router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let Update = await CustomerModel.findByIdAndUpdate(id, ((req.body)), { new: true });
   
    res.send({
        status: "Success",
        message: "Successfully Update Data Customer",
        info: Update
    })
});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    let DElete = await CustomerModel.findByIdAndDelete(id);
    if (!DElete) {
        res.send(` waa la delete gareye ${id}  `);
        return
    }
    res.send({
        status: "Success",
        message: "Successfully Delete Data Customer",
        info: DElete
    })
})



module.exports = router;