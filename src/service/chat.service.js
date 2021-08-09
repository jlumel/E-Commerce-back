const messageModel = require('../models/message.model')
const { logger, errorLog } = require('./logger.service')

const chat = io => {

    io.on('connection', socket => {

        logger.info(`Nueva conexión ID: ${socket.id}`)

        messageModel.find({})
            .then(res => res.forEach(msj => socket.emit('chat', msj)))
            .catch(err => errorLog.error(err))



        socket.on('chat', message => {
            const newMessage = new messageModel({ ...message, userId: '1' })
            newMessage.save()
                .then(() => logger.info('Mensaje enviado'))
                .catch(err => errorLog.error(err))

            io.emit('chat', message)
        })
    })

    io.on('disconnect', () => {
        logger.info('Se desconecto el Websocket')
    })
}

module.exports = chat