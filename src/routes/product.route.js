const productService =  require('../controllers/product.controller')

const Productos = (router) => {

    router.get('/productos', (req, res) => {
        if (req.query.title) {
            productService.getProductByTitle(req, res)
        } else if (req.query.min) {
            productService.getProductsByPrice(req, res)
        } else {
            productService.getProducts(req, res)
        }
    })

    router.post('/productos', (req, res) => {
        if (req.isAuthenticated()) {
            productService.addProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.get('/productos/:id', (req, res) => {
        if (req.isAuthenticated()) {

            productService.getProductById(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }
    })

    router.patch('/productos/:id', (req, res) => {

        if (req.isAuthenticated()) {
            productService.updateProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })

    router.delete('/productos/:id', (req, res) => {
        if (req.isAuthenticated()) {
            productService.removeProduct(req, res)
        } else {
            res.send({ error: -1, descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizados` })
        }

    })
}

module.exports = Productos