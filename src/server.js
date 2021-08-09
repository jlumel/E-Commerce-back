const express =  require('express')
const products = require('./routes/product.route')
const users = require('./routes/user.route')
const cart = require('./routes/cart.route')
const initApp = require('./service/initApp.service')
const initSession = require('./service/initSession.service')
const cookieParser = require('cookie-parser')
const register = require('./routes/register.route')
const login = require('./routes/login.route')
const passportLocal = require('./service/passport-local.service')
const compression = require('compression')

const app = express()

const router = express.Router()

app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use('/api', router)

products(router)
cart(router)
users(router)
// initSession(app)
passportLocal(app)
login(router)
register(router)
initApp(app)

// app.get('/', (req, res) => {
//     if (req.isAuthenticated()) {
//         productController.getProducts(req, res)
//     } else {
//         res.render('login')
//     }
// })