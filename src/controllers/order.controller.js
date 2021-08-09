const orderModel = require('../models/order.model')
const { errorLog } = require('../service/logger.service')
const sendMail = require('../service/nodemailer.service')

const orderController = {

    getOrders: (req, res) => {
        orderModel.find({ "userId": req.session.user._id })
            .then(orders => res.send(orders))
            .catch(err => {
                res.render('errorpage', { error: { message: "No hay ordenes cargadas" } })
                errorLog.error(err)
            })
    },

    completeOrder: (req, res) => {

        const { id } = req.body
        orderModel.find({ "_id": id })
            .then(order => {
                if (order.state === 'generada') {
                    orden.state = 'completada'
                    sendMail('checkout', req.session.user, order)
                } else {
                    res.sendStatus(400)
                }
                res.send(order)
            })
            .catch(err => {
                res.status(400).render('errorpage', { error: { message: "Orden no encontrada" } })
                errorLog.error(err)
            })

    },

    getOrderById: (req, res) => {
        const id = req.params.id
        orderModel.find({ "_id": id })
            .then(order => res.send(order))
            .catch(err => {
                res.render('errorpage', { error: { message: "Orden no encontrada" } })
                errorLog.error(err)
            })
    }

}

module.exports = orderController