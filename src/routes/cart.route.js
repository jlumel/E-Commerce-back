const cartController = require('../controllers/cart.controller')
const verifyToken = require('../middleware/verifyToken')

const Carrito = router => {

    router.get('/cart', verifyToken,(req, res) => {
        cartController.getCart(req, res)
    })

    router.post('/cart/add', verifyToken,(req, res) => {
        cartController.addToCart(req, res)
    })

    router.delete('/cart/delete', verifyToken,(req, res) => {
        cartController.removeFromCart(req, res)
    })

    router.post('/cart/submit', verifyToken,(req, res) => {
        cartController.cartSubmit(req, res)
    })

}

module.exports = Carrito