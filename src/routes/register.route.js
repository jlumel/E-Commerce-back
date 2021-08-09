const sendMail = require('../service/nodemailer.service')
const bCrypt = require('bcrypt')
const userModel = require('../models/users.model')

const register = router => {

    router.get('/register', (req, res) => {
        res.render('register')
    })

    router.get('/failregister', (req, res) => {
        res.render('./failRegister')
    })

    router.post('/register', (req, res) => {

        const { username } = req.body
        const user = userModel.find(user => user.username === username)
        if (user) {
            res.send({ error: 'El usuario ya existe' })
        } else {
            const token = jwt.sign(req.body, config.jwt_secret, {expiresIn: `${Number(config.session_ttl) / 1000}`})
            const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10))
            const newUser = {...req.body, password: createHash(req.body.password)}
            newUser.save()
            .then(() => {
                res.status(200).send({token})
            })
            sendMail('register', req.body, [])
            res.render('login')
        }

    })

}

module.exports = register