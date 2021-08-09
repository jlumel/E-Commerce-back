const config = require('../config/config')
const userModel = require('../models/user.model')
const bCrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = router => {

    router.post('/login', (req, res) => {
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
                    res.status(200).send({ token })
                }
            }
        })
    })
}


module.exports = login