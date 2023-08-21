const express = require('express');

const joi = require('joi')
const { UserModel } = require('../Model/Users')
const bcrypt = require('bcrypt')
const router = express.Router();


router.post('/', async (req, res) => {




    let { error } = ForgetValidation(req.body)


    if (error) return res.send(error.message)



    const UserData = await UserModel.findOne({ Email: req.body.Email })
    if (!UserData) return res.send('Email Waa  qalad')
    let salt = await bcrypt.genSalt(10)

    let { NewPassword } = req.body
    let { Confirm } = req.body

    if (NewPassword != Confirm) {
        return res.send("Labada Passwordka isku mid ka dhig")
    }

    NewPassword = await bcrypt.hash(NewPassword, salt)

    await UserModel.findByIdAndUpdate(UserData, {
        Password: NewPassword
    }, { new: true })




    res.send({
        status: "Success",
        message: "Change Password"
    })







})

const ForgetValidation = (fv) => {
    let forgetvalidation = joi.object({
        Email: joi.string().required().email(),
        NewPassword: joi.string().required(),
        Confirm: joi.string().required()
    })
    return forgetvalidation.validate(fv)
}

module.exports = router;

