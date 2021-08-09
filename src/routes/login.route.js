const config = require('../config/config')

const login = (router) => {

    router.get('/login', (req, res) => {
        res.render('login')
    })

    router.get('/faillogin', (req, res) => {
        res.render('./failLogin')
    })

    router.get('/logout', (req, res) => {
        // const { username } = req.session.user
        req.logout()
        // res.render('./logout', { username })
        res.redirect('/login')

    })

    router.post('/login', (req, res) => {
        jwt.sign(req.body, config.jwt_secret, (err, token) => {
            if (err) {
                res.send({ message: 'No se pudo generar el token' })
            }
            res.send({ token })
        })
    })

}

module.exports = login