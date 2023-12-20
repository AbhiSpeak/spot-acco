const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'suadhaisiasuh7asdhasudhasi73'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}))


mongoose.connect(process.env.MONGO_URL)


app.get('/test', (req, res) => {
    res.json('test ok')
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(user);
    } catch(e) {
        res.status(422).json(e);
    }
    
})

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if(user) {
            const checkPass = bcrypt.compareSync(password, user.password)
            if(checkPass) {
                jwt.sign({email: user.email, 
                        id: user._id}
                        , jwtSecret, {}, (err, token) => {
                    if(err)
                        throw err
                    res.cookie('token', token).json(user)
                })
            }else
                res.status(422).json('pass not ok')
        } else {
            res.status(422).json('no user')
        }
    } catch(e) {
        res.json('nah')
    }
})

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async(err, user) => {
            if(err)
                throw err;
            const {name, email, _id} = await User.findById(user.id)

            res.json({name, email, _id});
        })
    }else {
        res.json(null);
    }
})
app.listen(4040);

//mongo user and pass: spotaco