const productController =  require('../controllers/product.controller')
const verifyToken = require('../middleware/jwt')

const Productos = router => {

    router.get('/productos', (req, res) => {
        if (req.query.title) {
            productController.getProductByTitle(req, res)
        } else if (req.query.min) {
            productController.getProductsByPrice(req, res)
        } else {
            productController.getProducts(req, res)
        }
    })

    router.post('/productos', (req, res) => {
        if (req.isAuthenticated()) {
            productController.addProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.get('/productos/:id', (req, res) => {
        if (req.isAuthenticated()) {

            productController.getProductById(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }
    })

    router.put('/productos/:id', (req, res) => {

        if (req.isAuthenticated()) {
            productController.updateProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.delete('/productos/:id', (req, res) => {
        if (req.isAuthenticated()) {
            productController.removeProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })
}

module.exports = Productos