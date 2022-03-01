const express = require('express')
const route = express.Router()
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contactController = require('./src/controllers/contactController')
const { loginRequired } = require('./src/middleware/middleware')

route.get('/', homeController.home)

route.get('/login', loginController.login)
route.post('/login/login', loginController.loginUser)
route.post('/login/register', loginController.registerUser)
route.get('/login/logout', loginController.logout)

route.get('/contact', loginRequired, contactController.contact)
route.post('/contact/create', loginRequired, contactController.create)
route.get('/contact/:id', loginRequired, contactController.editContact)
route.post('/contact/edit/:id', loginRequired, contactController.saveEditContact)
route.get('/contact/delete/:id', loginRequired, contactController.delete)

module.exports = route   