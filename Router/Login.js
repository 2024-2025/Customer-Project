
const joi = require('joi');
const express = require('express');
const { UserModel } = require('../Model/Users');
const { CustomerModel } = require('../Model/Customer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

require('dotenv').config();











const router = express.Router();

router.post('/', async (req, res) => {




    try {

        let { error } = LoginValidation(req.body);
        if (error) return res.send(` ${error.message} `)

        const UserData = await UserModel.findOne({ Email: req.body.Email });
        if (!UserData) return res.send("Email or Password is inCorrect");

        const CheckPass = await bcrypt.compare(req.body.Password, UserData.Password);
        if (!CheckPass) return res.send("Email or Password is inCorrect")

        const CustomerData = await CustomerModel.findOne({ _id: UserData.CustomerID });


        const token = jwt.sign({ id: UserData._id, Name: CustomerData.Name, Status: UserData.Status, Phone: CustomerData.Phone, Type: UserData.Type, Address: CustomerData.Address },
            process.env.JWT_KEY,
            // { expiresIn: 60 }
        );


        res.header("token", token).json({
            status: "Success",
            message: "Successfully Login In ",
            token: token
        })











    } catch (error) {

        res.send(error.message)

    }

})


const LoginValidation = (LV) => {
    let loginvalidation = joi.object({
        Email: joi.string().required().email(),
        Password: joi.string().required()
    })
    return loginvalidation.validate(LV);
}
module.exports = router;