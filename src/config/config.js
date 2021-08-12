const dotenv = require('dotenv')

dotenv.config()

let config = {
    mongo_url: process.env.MONGO_URL,
    nodemailer_host: process.env.NODEMAILER_HOST,
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_pass: process.env.NODEMAILER_PASS,
    session_ttl: process.env.SESSION_TTL,
    jwt_secret: process.env.JWT_SECRET
}

if (process.argv[2].toLowerCase() === 'dev') {
    config.environment = 'development'
    config.PORT = 8080
} else {
    config.environment = 'production'
    config.PORT = process.env.PORT
}

module.exports = config