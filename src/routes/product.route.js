const productController = require('../controllers/product.controller')
const verifyAdmin = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')

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

    router.post('/productos', verifyToken, verifyAdmin, (req, res) => {
        productController.addProduct(req, res)
    })

    router.get('/productos/:category', (req, res) => {
        productController.getProductByCategory(req, res)
    })

    router.put('/productos/:id', verifyToken, verifyAdmin, (req, res) => {
        productController.updateProduct(req, res)
    })

    router.delete('/productos/:id', verifyToken, verifyAdmin, (req, res) => {
        productController.removeProduct(req, res)
    })
}

module.exports = Productos