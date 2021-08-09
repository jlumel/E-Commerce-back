const orderModel = require('../models/order.model')
const {errorLog} = require('../service/logger.service')

const orderController = {

    getorders: (req, res) => {
        orderModel.find({})
            .then(orders => res.send(orders))
            .catch(err => {
                res.send({error: 1, descripcion: "No hay ordenes cargadas"})
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
            .catch((err) => {
                res.send({error: 2, descripcion: "Error al cargar el ordero"})
                errorLog.error(err)
            })
    },

    getorderById: (req, res) => {
        const id = req.params.id
        orderModel.find({ "_id": id })
            .then((order) => res.send(order))
            .catch((err) => {
                res.send({error: 3, descripcion: "ordero no encontrado"})
                errorLog.error(err)
            })
    },

    getorderByTitle: (req, res)=> {
        const {title} = req.query
        orderModel.find({title: {$regex: `${title}`, $options: "$i"}})
            .then((order) => res.send(order))
            .catch((err) => {
                res.send({error: 3, descripcion: "ordero no encontrado"})
                errorLog.error(err)
            })
    },

    getordersByPrice: (req, res)=> {
        const {min, max} = req.query
        orderModel.find({ price: {$lte: Number(max), $gte: Number(min)}})
            .then((order) => res.send(order))
            .catch((err) => {
                res.send({error: 3, descripcion: "ordero no encontrado"})
                errorLog.error(err)
            })
    },

    updateorder: (req, res) => {
        const id = req.params.id
        const { title, description, price, stock, thumbnails } = req.body
        const ordero = {
            title,
            description,
            price,
            stock,
            thumbnails
        }
        orderModel.updateOne({ "_id": id },
            {
                $set: { ...ordero }
            }
        )
            .then((ordero) => res.send(ordero))
            .catch((err) => {
                res.send({error: 4, descripcion: "No se pudo actualizar el ordero"})
                errorLog.error(err)
            })
    },

    removeorder:(req, res) => {
        const id = req.params.id
        orderModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch((err) => {
                res.send({error: 5, descripcion: "No se pudo eliminar el ordero"})
                errorLog.error(err)
            })
    }

}

module.exports = orderController