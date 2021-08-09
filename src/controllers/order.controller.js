const orderModel = require('../models/order.model')
const {errorLog} = require('../service/logger.service')

const orderController = {

    getorders: (req, res) => {
        orderModel.find({"userId": req.session.user._id})
            .then(orders => res.send(orders))
            .catch(err => {
                res.render('errorpage', { error: {message:"No hay ordenes cargadas" }})
                errorLog.error(err)
            })
    },

    addorder: (req, res) => {

        const { userId, items, timestamp, state, total } = req.body
        const ordero = {
            userId,
            items,
            timestamp,
            state,
            total
        }
        const nuevoordero = new orderModel(ordero)
        nuevoordero.save()
            .then(() => res.sendStatus(201))
            .catch(err => {
                res.render('errorpage', { error: {message:"Error al cargar el ordero" }})
                errorLog.error(err)
            })
    },

    getorderById: (req, res) => {
        const id = req.params.id
        orderModel.find({ "_id": id })
            .then(order => res.send(order))
            .catch(err => {
                res.render('errorpage', { error: {message:"Orden no encontrada" }})
                errorLog.error(err)
            })
    }

}

module.exports = orderController