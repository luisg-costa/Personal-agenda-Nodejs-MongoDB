//para ler o ficheiro .env
require('dotenv').config()

const express = require('express')
//cria a app com express
const app = express()

//conexão DB
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

//const helmet = require('helmet')
const csrf = require('csurf')

const {checkCsrfError, csrfMiddleware, inputErrors, messages, sessionUser} = require('./src/middleware/middleware')

//para conseguirmos receber o que vem num POST
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//para os arquivos estáticos (css, img, etc..)
app.use(express.static(path.resolve(__dirname,'public')))

//ativer o helmet - segurança
//app.use(helmet())

//configurar a session
const sessionOptions = session({
    secret: 'asd435ofdsgodfsombvxzc433q',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
        httpOnly: true
    }
})
app.use(sessionOptions)
app.use(flash())

//para configurar as views
app.set('views', path.resolve(__dirname,'src','views'))
app.set('view engine', 'ejs')

//csrf token
app.use(csrf())
app.use(csrfMiddleware) // gerar token
app.use(checkCsrfError) //tratar os erros
app.use(inputErrors)
app.use(messages)
app.use(sessionUser)
//para configurar as rotas
app.use(routes)

app.on('start', () => {
    app.listen(3000, () => {
        console.log('Servidor executando na porta 3000')
        console.log('Acesso http://localhost:3000')
    }) 
})
