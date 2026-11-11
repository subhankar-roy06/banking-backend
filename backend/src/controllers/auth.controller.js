const userModel = require('../models/user.model')

async function userRegisterController(req, res) {
    const { email, password, name } = req.body ?? {}

    try {
        const user = await userModel.create({ email, password, name })

        return res.status(201).json({
            id: user._id,
            email: user.email,
            name: user.name
        })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Email already exists' })
        }

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message })
        }

        return res.status(500).json({ message: 'Unable to register user' })
    }
}

module.exports = userRegisterController