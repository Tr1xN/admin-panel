import mongoose from 'mongoose'

const cakeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:false
    },
    price:{
        type: Number,
        required: true
    },
    source:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    }
})

let cakeModel = mongoose.model('cakes', cakeSchema)
export default cakeModel