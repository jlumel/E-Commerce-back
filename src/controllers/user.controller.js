const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')
const sendMail = require('../service/nodemailer.service')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10))

const userController = {
   registerUser: (req, res) => {
      const { username, password, password2, email, firstName, lastName, address, age, phone, admin = false } = req.body
      userModel.findOne({ username: username }, (err, user) => {

         if (user) {
            res.send({ error: 'El usuario ya existe' })
         } else if (username && password && password2 && email && firstName && lastName && address && age && phone) {
            if (password !== password2) {
               return res.send({ error: 'Las contraseñas no coinciden' })
            }
            const token = jwt.sign(req.body, config.jwt_secret, { expiresIn: `${Number(config.session_ttl) / 1000}` })
            let newUser = new userModel()
            newUser.username = username
            newUser.password = createHash(password)
            newUser.email = email
            newUser.firstName = firstName
            newUser.lastName = lastName
            newUser.address = address
            newUser.age = Number(age)
            newUser.phone = phone
            newUser.admin = admin
            newUser.save()
               .then(user => {
                  let cart = new cartModel()
                  cart.userId = user._id
                  cart.products = []
                  cart.timestamp = Date.now()
                  cart.address = user.address
                  cart.save()
                     .then(() => {
                        sendMail('register', req.body, null)
                        res.status(200).send({ token })
                     })
               })
         } else {
            res.status(400).send({ message: 'Todos los campos son obligatorios' })
         }
      })
   },
   loginUser: (req, res) => {
      let { username, password } = req.body
      userModel.findOne({ username: username }, (err, user) => {

         if (!user) {
            res.send({ error: 'El usuario no existe' })
         } else {
            const validatePassword = (user, password) => bCrypt.compareSync(password, user.password)
            if (!validatePassword(user, password)) {
               res.status(403).send({ error: 'Password inválida' })
            } else {
               const token = jwt.sign({ password: createHash(password), ...user }, config.jwt_secret, { expiresIn: config.session_ttl })
               req.session.user = user
               res.status(200).send({ token })
            }
         }
      })
   },
   logoutUser: (req, res) => {
      req.session.destroy()
      res.redirect('/')
   }
}

module.exports = userController