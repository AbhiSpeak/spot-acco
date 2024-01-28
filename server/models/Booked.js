const mongoose = require('mongoose')

const bookedSchema = new mongoose.Schema({
    place: {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Place'
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required: true
    },
    checkIn: {
        type: Date,
        required: true
    },
    checkOut: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    }
})

const BookedModel = mongoose.model('Booking', bookedSchema)

module.exports = BookedModel