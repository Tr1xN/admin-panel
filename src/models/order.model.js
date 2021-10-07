const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    cake:{
        type: String,
    },
    price:{
        type: Number,
    },
    weight:{
        type: Number,
    },
    deliveryPoint:{
        type: String,
    },
    date:{
        type: Date,
    },
    base:{
        type: String,
    },
    userID:{
        type: Number,
    },
}, { _id: false })

let orderModel = mongoose.model('orders', orderSchema)
module.exports = orderModel