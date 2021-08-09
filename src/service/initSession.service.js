const MongoStore =  require('connect-mongo')
const session = require('express-session')
const config = require('../config/config')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const initSession = (app) => {
    
    app.use(session({
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            mongoOptions: advancedOptions
        }),
        secret: 'session',
        cookie: { maxAge: Number(config.session_ttl) },
        resave: false,
        saveUninitialized: false
    }))
} 

module.exports = initSession