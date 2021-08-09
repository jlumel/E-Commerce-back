const cartController = require('../controllers/cart.controller')
const sendMail = require('../service/nodemailer.service')
const verifyToken = require('../middleware/jwt')

const Carrito = router => {

    router.get('/carrito', verifyToken, (req, res) => {
        cartController.getCarts(req, res)
    })

    router.get('/carrito/:id', (req, res) => {
        cartController.getCartById(req, res)
    })

    router.post('/carrito', (req, res) => {
        cartController.createCart(req, res)
    })

    router.delete('/carrito/:id', (req, res) => {
        cartController.removeCart(req, res)
    })

    router.post('/checkout', (req, res) => {
        const cart = req.body.cart
        const user = req.body.user
        sendMail('checkout', user, cart)
        res.send(cart)
    })

}

module.exports = Carrito