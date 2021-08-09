const express = require('express')
const products = require('./routes/product.route')
const users = require('./routes/user.route')
const cart = require('./routes/cart.route')
const initApp = require('./service/initApp.service')
const initSession = require('./service/initSession.service')
const cookieParser = require('cookie-parser')
const register = require('./routes/register.route')
const login = require('./routes/login.route')
const compression = require('compression')

const app = express()

const router = express.Router()

app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/api', router)

initSession(app)

products(router)
cart(router)
users(router)
login(router)
register(router)
initApp(app)

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