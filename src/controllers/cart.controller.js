const cartModel = require('../models/cart.model')
const {errorLog} = require('../service/logger.service')

const cartController = {

    createCart: (req, res) => {
        const { timestamp, products } = req.body
        const cart = {
            timestamp,
            products
        }
        const nuevoCart = new cartModel(cart)
        nuevoCart.save()
            .then(() => res.sendStatus(201))
            .catch((err) => {
                res.send({ error: 6, descripcion: "Error al crear el carrito" })
                errorLog.error(err)
            })
    },

    getCarts: (req, res) => {
        cartModel.find({})
        .then((carts) => res.send(carts))
        .catch((err) => {
            res.send({ error: 7, descripcion: "Carrito no encontrado" })
            errorLog.error(err)
        })
    },

    getCartById: (req, res) => {
        const id = req.params.id
        cartModel.find({ "_id": id })
            .then((cart) => res.send(cart))
            .catch((err) => {
                res.send({ error: 7, descripcion: "Carrito no encontrado" })
                errorLog.error(err)
            })

    },

    removeCart: (req, res) => {
        const id = req.params.id
        cartModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch((err) => {
                res.send({ error: 8, descripcion: "No se pudo eliminar el carrito" })
                errorLog.error(err)
            })
    },

    addToCart: (req, res) => {
        const id = req.params.id
        const {timestamp, products} = req.body.cart
        const product = req.body.product
        cartModel.updateOne({"_id": id},
        {
            $set: {timestamp, products: product, ...products}
        }
        )
        .then((cart) => res.send(cart))
        .catch((err) => {
            res.send({error: 4, descripcion: "No se pudo actualizar el carrito"})
            errorLog.error(err)
        })
    },

    removeFromCart: (req, res) => {
        const id = req.params.id
        const cart = req.body.cart
        let {timestamp, products} = cart
        const product = req.body.product
        products = products.filter(product => product !== product)
        cartModel.updateOne({"_id": id},
        {
            $set: {timestamp, products}
        }
        )
        .then((cart) => res.send(cart))
        .catch((err) => {
            res.send({error: 4, descripcion: "No se pudo actualizar el carrito"})
            errorLog.error(err)
        })
    }


}

module.exports = cartController