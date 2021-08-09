const mongoose = require('mongoose')

const orderModel = mongoose.model('Order', new mongoose.Schema(
    {
        userId: { type: String, required: true },
        items: { type: Array, required: true },
        timestamp: { type: Number, required: true },
        state: { type: String, required: true },
        total: { type: Number, required: true }
    }
)
)

module.exports = orderModel