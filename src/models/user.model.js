const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:false
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    _id:{
        type: Number,
        required: true
    }
})

let userModel = mongoose.model('users', userSchema)
module.exports = userModel