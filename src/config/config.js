const dotenv = require('dotenv')

dotenv.config()

let config = {
    environment: '',
    mongo_url: process.env.MONGO_URL,
    PORT: process.env.PORT,
    nodemailer_host: process.env.NODEMAILER_HOST,
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_PASS: process.env.NODEMAILER_PASS,
    session_ttl: process.env.SESSION_TTL,
    jwt_secret: process.env.JWT_SECRET
}

if (process.argv[2].toLowerCase() === 'dev') {
    config.environment = 'development'
} else {
    config.environment = 'production'
}

module.exports = config