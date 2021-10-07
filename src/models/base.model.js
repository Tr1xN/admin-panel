const mongoose = require('mongoose')

const baseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
})

let baseModel = mongoose.model('bases', baseSchema)
module.exports = baseModel