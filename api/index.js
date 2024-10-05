const express = require('express')
require("dotenv").config()
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const protectAuth = require('./middlewares/protectAuth')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads')
        }
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.post('/recipe', protectAuth, upload.single('recipe-image'), (req, res) => {
    return res.status(200).json({
        URL: `api/recipes/${req.file.originalname}`
    })
})

app.use('/api/recipes', express.static('uploads'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/recipes', require('./routes/recipe.routes'))


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
        console.log("Connected to MongoDB")
    })
    .catch((error) => {
        console.log(error)
    })