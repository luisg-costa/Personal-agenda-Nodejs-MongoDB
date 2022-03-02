require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('start')
    })
    .catch(e => console.log(e))

const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const routes = require('./routes')
const path = require('path')

const helmet = require('helmet')
const csrf = require('csurf')

const {checkCsrfError, csrfMiddleware, inputErrors, messages, sessionUser} = require('./src/middleware/middleware')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'public')))
app.use(helmet())

const sessionOptions = session({
    secret: 'asd435ofdsgodfsombvxzc433q',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname,'src','views'))
app.set('view engine', 'ejs')

app.use(csrf())
app.use(csrfMiddleware) 
app.use(checkCsrfError) 
app.use(inputErrors)
app.use(messages)
app.use(sessionUser)

app.use(routes)

app.on('start', () => {
    app.listen(3000) 
})
