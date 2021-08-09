const mongoose = require('mongoose')

const messageModel = mongoose.model('Mensaje', new mongoose.Schema(
    {
        userId: { type: String, required: true },
        type: { type: String, required: true },
        user: { type: String },
        system: { type: Object },
        message: { type: String, required: true }
    }
)
)

module.exports = messageModel