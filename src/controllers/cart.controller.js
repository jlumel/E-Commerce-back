const cartModel = require('../models/cart.model')
const orderModel = require('../models/order.model')
const sendMail = require('../service/nodemailer.service')
const { errorLog } = require('../service/logger.service')

const cartController = {

    getCart: (req, res) => {
        const id = req.user._doc._id
        cartModel.find({ "userId": id })
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"Carrito no encontrado" }})
                errorLog.error(err)
            })
    },

    addToCart: (req, res) => {
        const id = req.user._doc._id
        cartModel.find({ "userId": id })
            .then(cart => {
                const products = cart[0].products
                const product = req.body
        cartModel.updateOne({ "userId": id },
            {
                $set: { products: [...products, product] }
            }
        )
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"No se pudo actualizar el carrito" }})
                errorLog.error(err)
            })
            })
            .catch(err => {
                res.render('errorpage', { error: {message:"Carrito no encontrado" }})
                errorLog.error(err)
            })
    },

    removeFromCart: (req, res) => {
        const id = req.user._doc._id
        cartModel.find({ "userId": id })
            .then(cart => {
                let products = Array(cart[0].products)
                const product = req.body
                console.log(product)
                console.log(products)
                products = products.filter(producto => product._id === producto._id)
        cartModel.updateOne({ "userId": id },
            {
                $set: { products: products }
            }
        )
            .then(cart => res.send(cart))
            .catch(err => {
                res.render('errorpage', { error: {message:"No se pudo actualizar el carrito" }})
                errorLog.error(err)
            })
            })
            .catch(err => {
                res.render('errorpage', { error: {message:"Carrito no encontrado" }})
                errorLog.error(err)
            })
    },
    cartSubmit: (req, res) => {
        cartModel.find({ "userId": req.user._doc._id })
            .then(cart => {
                cart = cart[0]
                if (!cart.products.length) {
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
                            sendMail('checkout', req.user._doc, newOrder)
                            res.status(200).send({message: 'Orden creada'})
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