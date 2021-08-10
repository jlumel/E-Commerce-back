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

    router.post('/productos', verifyToken, (req, res) => {
            productController.addProduct(req, res)
    })

    router.get('/productos/:category', (req, res) => {
            productController.getProductByCategory(req, res)
    })

    router.put('/productos/:id', verifyToken, (req, res) => {
            productController.updateProduct(req, res)
    })

    router.delete('/productos/:id', verifyToken, (req, res) => {
            productController.removeProduct(req, res)
    })
}

module.exports = Productos