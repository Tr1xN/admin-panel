import AdminBro from 'admin-bro'
import AdminBroMongoose from '@admin-bro/mongoose'
import AdminBroExpress from '@admin-bro/express'

import mongoose from 'mongoose'
import express from 'express'

import orderModel from './src/models/order.model.js'
import userModel from './src/models/user.model.js'
import adminModel from './src/models/admin.model.js'
import cakeModel from './src/models/cake.model.js'
import optionsModel from './src/models/options.model.js'
import config from './config.js'

const app = express()
app.use('/public', express.static('public'));
AdminBro.registerAdapter(AdminBroMongoose)

mongoose.connect(config.mongoURI)
const AdminBroOptions = {
  resources: [
    { 
      resource: userModel, options: {
        listProperties: ['firstName', '_id', 'phoneNumber'],
        properties :{
          firstName: {
            isVisible: { list: true, filter: true, show: true, edit: false },
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
        listProperties: ['cake', 'price', 'deliveryPoint', 'date', 'phoneNumber'],
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
          deliveryPoint: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          date: {
            isVisible: { list: true, filter: true, show: true, edit: false },
          },
          phoneNumber: {
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
            availableValues: [{value: 'Ексклюзивний', label: 'Ексклюзивний'}, {value: 'Вишуканий смак', label: 'Вишуканий смак'}]
          }
        }
      }
    },
    {
      resource: optionsModel, options: {
        actions: {
          new: {
            isVisible: false,
          },
        },
        listProperties: ['mail'],
        properties :{
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
          mail: {
            isVisible: { list: true, filter: false, show: true, edit: true },
          },
        }
      },
    }
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
        firstName: 'Ім’я',
        phoneNumber: 'Номер користувача',
        minWeight: 'Мінімальна вага'
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
app.listen(config.port, () => console.log('AdminBro is under localhost:8080/admin'))