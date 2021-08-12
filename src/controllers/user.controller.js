const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')
const sendMail = require('../service/nodemailer.service')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const userController = {
   registerUser: (req, res) => {
      const { username, password, email, firstName, lastName, address, age, phone, admin = false } = req.body
      userModel.findOne({ username: username }, (err, user) => {

         if (user) {
            console.log(user)
            res.send({ error: 'El usuario ya existe' })
         } else if(username && password && email && firstName && lastName && address && age && phone) {

            const token = jwt.sign(req.body, config.jwt_secret, { expiresIn: `${Number(config.session_ttl) / 1000}` })
            const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10))
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
            res.status(400).send({message: 'Todos los campos son obligatorios'})
         }
      })
   },
   loginUser: (req, res) => {
      const { username, password } = req.body
      userModel.findOne({ username: username }, (err, user) => {

         if (!user) {
            res.send({ error: 'El usuario no existe' })
         } else {
            const validatePassword = (user, password) => bCrypt.compareSync(password, user.password)
            if (!validatePassword(user, password)) {
               res.status(403).send({ error: 'Password inválida' })
            } else {
               const token = jwt.sign(req.body, config.jwt_secret, { expiresIn: `${Number(config.session_ttl) / 1000}` })
               req.session.user = user
               res.status(200).send({ token })
            }
         }
      })
   }
}

module.exports = userController