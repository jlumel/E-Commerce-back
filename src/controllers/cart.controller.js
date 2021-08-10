const cartModel = require('../models/cart.model')
const orderModel = require('../models/order.model')
const sendMail = require('../service/nodemailer.service')
const { errorLog } = require('../service/logger.service')

const cartController = {

    getCartById: (req, res) => {
        const id = req.params.id
        cartModel.find({ "_id": id })
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"Carrito no encontrado" }})
                errorLog.error(err)
            })
    },

    addToCart: (req, res) => {
        const id = req.params.id
        const { timestamp, products } = req.body.cart
        const product = req.body.product
        cartModel.updateOne({ "_id": id },
            {
                $set: { timestamp, products: product, ...products }
            }
        )
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"No se pudo actualizar el carrito" }})
                errorLog.error(err)
            })
    },

    removeFromCart: (req, res) => {
        const id = req.params.id
        const cart = req.body.cart
        let { timestamp, products } = cart
        products = products.filter(product => product !== product)
        cartModel.updateOne({ "_id": id },
            {
                $set: { timestamp, products }
            }
        )
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"No se pudo actualizar el carrito" }})
                errorLog.error(err)
            })
    },
    cartSubmit: (req, res) => {
        cartModel.find({ "_id": req.session.user._id })
            .then(cart => {
                if (!cart.length) {
                    res.sendStatus(400)
                } else {
                    let newOrder = new orderModel()
                    newOrder.userId = cart.userId
                    newOrder.items = cart.products
                    newOrder.timestamp = Date.now()
                    newOrder.state = 'generada'
                    newOrder.total = cart.products.reduce((acc, product) => acc + product.price, 0)
                    newOrder.save()
                        .then(() => {
                            sendMail('checkout', req.session.user, newOrder)

                        })
                }
            })
            .catch(err => {
                res.render('errorpage', { error: {message:"Carrito no encontrado"}})
                errorLog.error(err)
            })

    }


}

module.exports = cartController