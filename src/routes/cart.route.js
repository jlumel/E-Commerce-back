const cartController = require('../controllers/cart.controller')

const Carrito = router => {

    router.get('/cart', (req, res) => {
        cartController.getCart(req, res)
    })

    router.post('/cart/add', (req, res) => {
        cartController.addToCart(req, res)
    })

    router.delete('/cart/delete', (req, res) => {
        cartController.removeFromCart(req, res)
    })

    router.post('/cart/submit', (req, res) => {
        cartController.cartSubmit(req, res)
    })

}

module.exports = Carrito