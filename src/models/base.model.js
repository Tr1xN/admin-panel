import mongoose from 'mongoose'

const baseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

let baseModel = mongoose.model('bases', baseSchema)
export default baseModel