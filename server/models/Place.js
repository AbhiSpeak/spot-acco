const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    address: String,
    addedPhotos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
})

const PlaceModule =  mongoose.model('Place', PlaceSchema)
module.exports = PlaceModule