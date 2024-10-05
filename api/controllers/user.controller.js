const User = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const isExists = await User.findOne({ email: req.body.email })

        if (isExists) {
            return res.status(400).json({ message: "User already exists" })
        }


        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password, salt)

        const doc = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })

        const user = await doc.save()

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        const { password, ...userData } = user._doc // Remove password from user data

        return res.status(200).json({ userData, token})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password)

        if (!isValidPassword) {
            return res.status(400).json({ message: "Password is wrong" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        const { password, ...userData } = user._doc // Remove password from user data

        return res.status(200).json({ userData, token})
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const account = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        const { password, ...userData } = user._doc // Remove password from user data
        
        return res.status(200).json({ userData })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    register,
    login,
    account
}