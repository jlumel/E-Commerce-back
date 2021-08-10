const nodemailer = require('nodemailer')
const { logger, errorLog } = require('./logger.service.js')
const config = require('../config/config')

const sendMail = (type, user, order) => {
    const transporter = nodemailer.createTransport({
        host: config.nodemailer_host,
        port: 587,
        auth: {
            user: config.nodemailer_user,
            pass: config.nodemailer_pass
        }
    })

    const registerOptions = {
        from: 'Ecommerce NodeJS',
        to: user.email,
        subject: 'Información de registro de usuario',
        html: `<h1>${user.username} se ha registrado exitosamente ${new Date().toLocaleString()}</h1>`
    }

    const checkoutOptions = {
        from: 'Ecommerce NodeJS',
        to: user.email,
        subject: `Nuevo pedido de ${user.username} - ${user.email} `,
        html: `<ul>
        <li>
        <ol>
        ${order ? order.items.map(item => `<li>${item.title} - ${item.description} - $${item.price}</li>`): ''}
        </ol>
        </li>
        <li>Creada ${order ? order.timestamp.toLocaleString() : ''}</li>
        <li>Estado: ${order ? order.state: ''}</li>
        <li>Monto total: $${order ? order.total: ''}</li>
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

