const sendMail = require('../service/nodemailer.service')
const bCrypt = require('bcrypt')
const userModel = require('../models/user.model')
const cartModel = require('../models/cart.model')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

const register = router => {

    router.post('/register', (req, res) => {

        const { username, password, email, firstName, lastName, address, age, phone, admin = false } = req.body
        userModel.findOne({ username: username }, (err, user) => {

            if (user) {
                console.log(user)
                res.send({ error: 'El usuario ya existe' })
            } else {

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
                                sendMail('register', req.body, [])
                                res.status(200).send({ token })
                            })

                    })
            }

        })

    })
}

module.exports = register