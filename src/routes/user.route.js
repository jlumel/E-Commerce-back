const userController = require('../controllers/user.controller')


const Usuarios = router => {

    router.post('/user/signup', (req, res) => {
        userController.registerUser(req, res)
    })

    router.post('/user/login', (req, res) => {
        userController.loginUser(req, res)
    })
}

module.exports = Usuarios