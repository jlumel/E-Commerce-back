const nodemailer =  require('nodemailer')
const {Product} =  require('../models/product.model')
const { User } =  require('../models/users.model')
const { logger, errorLog } = require('./logger.service.js')
const config = require('../config/config')

const sendMail = (type, user, cart) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: config.nodemailer_user,
            pass: config.nodemailer_pass
        }
    })

    const registerOptions = {
        from: 'Ecommerce NodeJS',
        to: config.nodemailer_user,
        subject: 'Información de registro de usuario',
        html: `<h1>${user.username} se ha registrado exitosamente ${new Date().toLocaleString()}</h1>`
    }

    const checkoutOptions = {
        from: 'Ecommerce NodeJS',
        to: process.env.NODEMAILER_USER,
        subject: `Nuevo pedido de ${user.username} - ${user.email} `,
        html: `<ul>
        ${cart.map(product => `<li>${product}</li>`)}
        </ul>`
    }


    switch (type) {
        case 'register':
            transporter.sendMail(registerOptions, (err, info) => {
                if (err) {
                    errorLog.error(err)
                    return err
                }
                logger.info(info)
            })
            break;
        case 'checkout':
            transporter.sendMail(checkoutOptions, (err, info) => {
                if (err) {
                    errorLog.error(err)
                    return err
                }
                logger.info(info)
            })
            break;
    }




}

module.exports = sendMail

