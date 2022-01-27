import mongoose from 'mongoose'

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
    minWeight:{
        type: Number,
    }
})

let cakeModel = mongoose.model('cakes', cakeSchema)
export default cakeModel