const express = require('express')
const products = require('./routes/product.route')
const users = require('./routes/user.route')
const cart = require('./routes/cart.route')
const initApp = require('./service/initApp.service')
const initSession = require('./service/initSession.service')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const chat = require('./service/chat.service')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const router = express.Router()

// Middlewares

app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/api', router)

//Inicializacion de la App

initApp(http)
initSession(app)
chat(io)

//Rutas

products(router)
cart(router)
users(router)

app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/api/productos')
    } else {
        res.redirect('login')
    }
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/chat', (req, res)=> {
    res.render('chat')
})

app.get('/chat/:user', (req, res)=> {
    const user = req.params.user
    res.render('chat', {user})
})