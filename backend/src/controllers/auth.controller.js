const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const cookieParser  = require('cookie-parser')
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
        return res.status(401).json({
            message:"User already exists with the email",
            status:"failed"
        })
    }
    const user = await userModel.create({
        email,password,name
    })

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"})
    res.cookie('JWT_TOKEN', token)
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            user:user.name
        },
        token
    })
}


// async function userLoginController(req ,res){
//     const{email,password} = req.body

//     const user = await userModel.findOne({ email }).select('+password')

//     if (!user || !(await user.comparePassword(password))) {
//         return res.status(401).json({
//             message: 'Email or password is incorrect',
//             status: 'failed'
//         })
//     }
//     const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
//         expiresIn:"3d"})
//     res.cookie('JWT_TOKEN', token)
//     res.status(200).json({
//         user:{
//             _id:user._id,
//             email:user.email,
//             user:user.name
//         },
//         token
//     })
// }


async function userLoginController(req , res) {
    const {email,password} = req.body
    
    const user = await userModel.findOne({ email }).select('+password')

    if(!user){
        return res.status(401).json({
            message:"email or password invalid",
            status:"failed"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if(!isValidPassword){
        return res.status(401).json({
            message:"email or password invalid",
            status:"failed"
        })
    }


    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn:"3d"})
    res.cookie('JWT_TOKEN', token)
    res.status(201).json({
        user:{
            _id:user._id,
            email:user.email,
            user:user.name
        },
        token
    })


}
    

module.exports = {
    userRegisterController,
    userLoginController
}