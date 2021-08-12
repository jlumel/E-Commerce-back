const orderModel = require('../models/order.model')
const { errorLog } = require('../service/logger.service')
const sendMail = require('../service/nodemailer.service')

const orderController = {

    getOrders: (req, res) => {
        orderModel.find({ "userId": req.user._doc._id })
            .then(orders => res.send(orders))
            .catch(err => {
                res.render('errorpage', { error: { message: "No hay ordenes cargadas" } })
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
    },

    completeOrder: (req, res) => {

        const id = req.body._id
        orderModel.find({ "_id": id })
            .then(order => {
                order = order[0]
                if (order.state === 'generada') {
                    order.state = 'completada'
                    sendMail('checkout', req.user._doc, order)
                } else {
                    res.sendStatus(400)
                }
                res.send(order)
            })
            .catch(err => {
                res.status(400).render('errorpage', { error: { message: "Orden no encontrada" } })
                errorLog.error(err)
            })

    }

}

module.exports = orderController