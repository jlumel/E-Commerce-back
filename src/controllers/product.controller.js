const productModel = require('../models/product.model')
const { errorLog } = require('../service/logger.service')

const productController = {

    getProducts: (req, res) => {
        productModel.find({})
            .then(products => res.send(products))
            .catch(err => {
                res.render('errorpage', { error: { message: "No hay productos cargados" } })
                errorLog.error(err)
            })
    },

    addProduct: (req, res) => {

        const { title, description, category, price, stock, thumbnails } = req.body
        if (title && description && category && price && stock >= 0 && thumbnails) {
            const producto = {
                title,
                description,
                category,
                price,
                stock,
                thumbnails
            }
            const nuevoProducto = new productModel(producto)
            nuevoProducto.save()
                .then(() => res.sendStatus(201))
                .catch(err => {
                    res.render('errorpage', { error: { message: "Error al cargar el producto" } })
                    errorLog.error(err)
                })
        } else {
            res.status(400).send({ message: 'Todos los campos son obligatorios' })
        }
        
    },

    getProductByCategory: (req, res) => {
        const category = req.params.category
        productModel.find({ "category": category })
            .then(product => res.send(product))
            .catch(err => {
                res.render('errorpage', { error: { message: "Producto no encontrado" } })
                errorLog.error(err)
            })
    },

    getProductByTitle: (req, res) => {
        const { title } = req.query
        productModel.find({ title: { $regex: `${title}`, $options: "$i" } })
            .then(product => res.send(product))
            .catch(err => {
                res.render('errorpage', { error: { message: "Producto no encontrado" } })
                errorLog.error(err)
            })
    },

    getProductsByPrice: (req, res) => {
        const { min, max } = req.query
        productModel.find({ price: { $lte: Number(max), $gte: Number(min) } })
            .then(product => res.send(product))
            .catch(err => {
                res.render('errorpage', { error: { message: "Producto no encontrado" } })
                errorLog.error(err)
            })
    },

    updateProduct: (req, res) => {
        const id = req.params.id
        const { title, description, category, price, stock, thumbnails } = req.body
        const producto = {
            title,
            description,
            category,
            price,
            stock,
            thumbnails
        }
        productModel.updateOne({ "_id": id },
            {
                $set: { ...producto }
            }
        )
            .then((producto) => res.send(producto))
            .catch(err => {
                res.render('errorpage', { error: { message: "No se pudo actualizar el producto" } })
                errorLog.error(err)
            })
    },

    removeProduct: (req, res) => {
        const id = req.params.id
        productModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch(err => {
                res.render('errorpage', { error: { message: "No se pudo eliminar el producto" } })
                errorLog.error(err)
            })
    }

}

module.exports = productController