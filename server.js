const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const uploadFeature = require('@admin-bro/upload')

const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use('/public', express.static('public'));
AdminBro.registerAdapter(AdminBroMongoose)

const orderModel = require ('./src/models/order.model.js')
const userModel = require ('./src/models/user.model.js')
const cakeModel = require ('./src/models/cake.model.js')

mongoose.connect('mongodb://localhost:27017/wowtort')
const AdminBroOptions = {
    resources: [{
        resource: cakeModel,
        options: { properties: { mimeType: { /** ... **/ } }},
        features: [uploadFeature({
          provider: { local: { bucket: 'public' } },
          properties: {
            key: 'fileUrl',
            mimeType: 'mimeType'
          },
        })]
      }]
}
const adminBro = new AdminBro(AdminBroOptions)

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))