const cartController = require('../controllers/cart.controller')
const verifyToken = require('../middleware/jwt')

const Carrito = router => {

    router.get('/carrito/:id', (req, res) => {
        cartController.getCartById(req, res)
    })

    router.post('/carrito/add', (req, res) => {
        cartController.addToCart(req, res)
    })

    router.delete('/carrito/delete/:id', (req, res) => {
        cartController.removeFromCart(req, res)
    })

    router.post('/cart/submit', (req, res) => {
        cartController.cartSubmit(req, res)
    })

}

module.exports = Carrito