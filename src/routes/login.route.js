const config = require('../config/config')

const login = router => {

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
        const { username, password } = req.body
        const user = userModel.find(user => user.username === username)
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

}

module.exports = login