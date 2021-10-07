const mongoose = require('mongoose')

const cakeSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    source:{
        type: String,
    },
    category:{
        type: String,
    },
})

let cakeModel = mongoose.model('cakes', cakeSchema)
module.exports = cakeModel