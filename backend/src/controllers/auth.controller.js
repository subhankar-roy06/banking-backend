const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
/*
    - user register Controller
    - POST /api/auth/register
*/

async function userRegisterController(req, res){

    const {email,password,name} = req.body

    const isExists = await userModel.findOne({
        email:email
    })
    if(isExists){
        return res.status(422).json({
            message:"User already exists with the email",
            status:"failed"
        })
    }
    const user = await userModel.create({
        email,password,name
    })
}
module.exports = {
    userRegisterController

}