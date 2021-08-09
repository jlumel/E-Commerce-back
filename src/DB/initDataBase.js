const mongoose = require('mongoose')
const config = require('../config/config')

exports.mongoDB = mongoose.connect(config.mongo_url || '',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )