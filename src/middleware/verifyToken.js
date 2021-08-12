const jwt = require('jsonwebtoken')
const config = require('../config/config')

const jwtSecret = config.jwt_secret

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        res.status(403).send({
            error: 'Falta el header authorization'
        })
    } else {
        const jwtToken = token.split(' ')[1]

        jwt.verify(jwtToken, jwtSecret, (err, value) => {
            if (err) {
                res.status(403).send({
                    message: 'Token inválido'
                })
            } else {
                next()
            }


        })

    }


}

module.exports = verifyToken