const mongoose = require('mongoose')

const cartModel = mongoose.model('Carrito', new mongoose.Schema(
    {
        timestamp: { type: Number, required: true },
        products: { type: Array, required: true }
    }
)
)

module.exports = cartModel