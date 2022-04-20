import mongoose from 'mongoose'
import config from './config.js'
mongoose.connect(config.mongoURI)
import adminModel from './src/models/admin.model.js'
new adminModel({email: "admin", password: "admin"}).save()