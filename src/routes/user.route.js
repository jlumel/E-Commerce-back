const userController = require('../controllers/user.controller')

const Usuarios = router => {

    router.get('/usuarios', (req, res) => {
        if (req.body.username) {
            userController.getUserByUsername(req, res)
        } else {
            userController.getUsers(req, res)
        }
    })

    router.post('/usuarios', (req, res) => {
        userController.addUser(req, res)

    })

    router.put('/usuarios/:id', (req, res) => {
        userController.updateUser(req, res)
    })

    router.delete('/usuarios/:id', (req, res) => {

        userController.removeUser(req, res)

    })
}

module.exports = Usuarios