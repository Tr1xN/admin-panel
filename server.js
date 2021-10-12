const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroExpress = require('@admin-bro/express')
const uploadFeature = require('@admin-bro/upload')
const passwordsFeature = require('@admin-bro/passwords')
const bcrypt = require('bcrypt')


const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use('/public', express.static('public'));
AdminBro.registerAdapter(AdminBroMongoose)

const orderModel = require ('./src/models/order.model.js')
const userModel = require ('./src/models/user.model.js')
const adminModel = require ('./src/models/admin.model.js')
const cakeModel = require ('./src/models/cake.model.js')
const baseModel = require ('./src/models/base.model.js')

mongoose.connect('mongodb://localhost:27017/wowtort')
const AdminBroOptions = {
  resources: [
    { 
      resource: userModel, options: {
        listProperties: ['firstName', '_id', 'phoneNumber'],
        properties :{
          firstName: {
            isVisible: { list: true, filter: true, show: true, edit: true },
          },
          _id: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          phoneNumber: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
        }
      },
    },
    {
      resource: orderModel, options: {
        listProperties: ['cake', 'price', 'weight', 'deliveryPoint', 'date', 'base', 'userID'],
        properties :{
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          cake: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          price: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          weight: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          deliveryPoint: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          date: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          base: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          userID: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
        }
      },
    },
    {
      resource: cakeModel, options: {
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
        phoneNumber: 'Номер телефону',
        _id: 'ID',
        cake: 'Торт',
        weight: 'Вага',
        deliveryPoint: 'Точка вивезення',
        date: 'Дата',
        base: 'Основа',
        firstName: 'Ім’я'
      },
    }
  },
  branding: {
    companyName: 'Wow Tort',
    softwareBrothers: false,
  },
}
const adminBro = new AdminBro(AdminBroOptions)

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const admins = await adminModel.findOne({ email })
      if (admins) {
        if (password === admins.password) {
          return admins
        }
      }
    return false
  },
  cookiePassword: 'session Key',
})

app.use(adminBro.options.rootPath, router)
app.listen(8080, () => console.log('AdminBro is under localhost:8080/admin'))