const express = require('express');
const router = express.Router();
const { UserValidation, UserModel } = require('../Model/Users');
const { CustomerModel } = require('../Model/Customer');
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    let CustomerData1 = await UserModel.find().populate({
        path: "CustomerID",
        model: "customer",
        select: "-_id Name "
    });
    res.send(CustomerData1)
})

router.get('/:id', async (req, res) => {
    let { id } = req.params;
    const FindOne = await UserModel.findById(id);
    if (!FindOne) return res.send('');
    res.send(FindOne)

})

router.post('/', async (req, res) => {

   try {
    let { error } = UserValidation(req.body);
    if (error) return res.send(error.message);
    const CustomerData = await CustomerModel.findOne({ _id: req.body.CustomerID });
    if (!CustomerData) return res.send("CustomerData Lama Haayo");

    const Post = new UserModel((req.body));

    const salt = await bcrypt.genSalt(10);
    Post.Password = await bcrypt.hash(Post.Password, salt);




    const info = await Post.save();
    res.send({
        status: "Success",
        message: "Successfully Inserted Data User",
        info: info
    })



   } catch (error) {
    res.send(error.message)
   }

})


router.put('/:id', async (req, res) => {
    let { id } = req.params;
    let Update = await UserModel.findByIdAndUpdate(id, (req.body), { new: true });
    if (!Update) return res.send('')

    res.send({
        status: "Success",
        message: "Successfully Update Data User",
        info: Update
    });

});

router.delete('/:id', async (req, res) => {
    let { id } = req.params;
    const Delete = await UserModel.findByIdAndDelete(id);
    if (!Delete) return res.send('')

    res.send({
        status: "Success",
        message: "Successfully Delete Data User",
        info: Delete
    });
});
module.exports = router