const mongoose = require('mongoose')

const productModel = mongoose.model('Producto', new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: {type: String, required: true},
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        thumbnails: { type: Array, required: true }
    }
)
)

module.exports = productModel