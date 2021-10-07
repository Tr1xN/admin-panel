const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cake:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: true
    },
    deliveryPoint:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: false
    },
    base:{
        type: String,
        required: false
    },
    userID:{
        type: Number,
        required: true
    }
})

let orderModel = mongoose.model('orders', orderSchema)
module.exports = orderModel