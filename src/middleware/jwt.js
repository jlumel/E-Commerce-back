const jwt = require('jsonwebtoken')
const config = require('../config/config')

const jwtSecret = config.jwt_secret

const verify = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.send({
            message: 'Falta el header authorization'
        })
    }

    const jwtToken = token.split(' ')[1]

    jwt.verify(jwtToken, jwtSecret, (err, value) => {
        if (err) {
            return res.send({
                message: 'Token inválido'
            })
        }
        req.user = value.data
        next()

    })
}

module.expoorts = verify