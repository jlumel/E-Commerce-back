const mongoose = require('mongoose')

const cartModel = mongoose.model('Carrito', new mongoose.Schema(
    {
        userId: {type:String, required: true},
        products: { type: Array, required: true },
        timestamp: { type: Number, required: true },
        address: {type: Object, required: true}
    }
)
)

module.exports = cartModel