const cartService = require('../controllers/cart.controller')
const sendMail = require('../service/nodemailer.service')
const Carrito = (router) => {

    router.get('/carrito', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.getCarts(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.get('/carrito/:id', (req, res) => {

        if (req.isAuthenticated()) {

            cartService.getCartById(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.post('/carrito', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.createCart(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.delete('/carrito/:id', (req, res) => {
        if (req.isAuthenticated()) {

            cartService.removeCart(req, res)
        } else {
            res.redirect('/login')
        }
    })

    router.post('/checkout', (req, res)=> {
        const cart = req.body.cart
        const user = req.body.user
        sendMail('checkout', user, cart)
        res.send(cart)
    })

}

module.exports = Carrito