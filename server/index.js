const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./models/User.js')
const Place = require('./models/Place.js')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const imageDownloader = require('image-downloader')
const multer = require('multer')

const fs = require('fs')
const BookedModel = require('./models/Booked.js')



const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'suadhaisiasuh7asdhasudhasi73'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+'/uploads'))

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


app.post('/logout', (req, res) => {
    res.cookie('token','').json(true);
})


app.post('/uploadImage', async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName)
})

const imgMiddleware = multer({dest:'uploads/'})

app.post('/upload', imgMiddleware.array('images', 100),(req, res) => {
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i++) {
        
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const extension = parts[parts.length - 1]
        const newPath = path + '.' + extension
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('uploads\\', ''))
    }
    console.log(uploadedFiles)
    res.json(uploadedFiles)
})

app.post('/places', (req, res) => {

    const {token} = req.cookies
    const
    {title, address, addedPhotos, 
    description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, price} = req.body
    jwt.verify(token, jwtSecret, {}, async(err, user) => {
        if(err)
            throw err;
        await Place.create({
            owner: user.id,
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price
        })
        res.json('done')
    })
})

app.get('/places', (req, res) => {
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async(err, user) => {
        const owner = user.id
        res.json(await Place.find({owner}))
    })
})

app.get('/places/:id', async(req, res) => {
    const {id} = req.params
    res.json(await Place.findById(id))
})

app.put('/places', async(req, res) => {
    const {token} = req.cookies
    const
    {id, title, address, addedPhotos, 
    description, perks, extraInfo, 
    checkIn, checkOut, maxGuests, price} = req.body

    jwt.verify(token, jwtSecret, {}, async(err, user) => {
        if(err)
            throw err
        const place = await Place.findById(id)
        if(user.id === place.owner.toString()) {
            place.set({
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price,
            })
            await place.save()
            res.json('ok')
        }
    })

})


app.get('/allplaces', async (req, res) => {
    res.json(await Place.find())
})

app.post('/booking', async(req, res) => {
    const {place, checkIn, 
            checkOut, maxGuests, 
                name, mobile, price} = req.body

    BookedModel.create({
        place, checkIn, 
            checkOut, maxGuests, 
                name, mobile, price
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw err
    })

})

app.listen(4040);

//mongo user and pass: spotaco