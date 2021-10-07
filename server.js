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
const baseModel = require ('./src/models/base.model.js')

mongoose.connect('mongodb://localhost:27017/wowtort')
const AdminBroOptions = {
<<<<<<< HEAD
  resources: [
    { resource: cakeModel, options: {
        listProperties: ['name', 'price', 'category'],
        properties :{
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          category : {
            availableValues: [{value: 'Святковий', label: 'Святковий'}, {value: 'Дитячий', label: 'Дитячий'}, {value: 'Весільний', label: 'Весільний'},]
          }
        }
      }
    },
  ],
  locale: {
    language: 'ua',
    translations: {
      actions: {
        new: 'Створити новий',
        edit: 'Редагувати',
        show: 'Детальніше',
        delete: 'Видалити',
        list: 'Список',
        search: 'Поиск',
        bulkDelete: 'Видалити',
        filter: 'Фільтр'
      },
      buttons: {
        save: 'Зберегти',
      },
      properties: {
        name: 'Назва',
        price: 'Ціна',
        source: 'Посилання на зображення торту',
        category: 'Категорія',
      },
    }
  },
  branding: {
    companyName: 'Wow Tort',
    softwareBrothers: false,
  },
=======
    resources: [{
        resource: cakeModel,
      }]
>>>>>>> 8e9d6f42007616c9a4d41941004fc953d3408b46
}
const adminBro = new AdminBro(AdminBroOptions)

const router = AdminBroExpress.buildRouter(adminBro)

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))