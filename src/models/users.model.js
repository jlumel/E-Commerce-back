const mongoose = require('mongoose')

const userModel = mongoose.model('User', new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: { type: String, required: true },
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        address: { type: String, required: true },
        age: { type: Number, required: true },
        phone: { type: String, required: true },
        admin: {type: Boolean}


    }
)
)

module.exports = userModel