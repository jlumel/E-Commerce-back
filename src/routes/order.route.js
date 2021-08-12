const orderController = require('../controllers/order.controller')
const verifyToken = require('../middleware/verifyToken')

const Ordenes = router => {

    router.get('/orders', verifyToken, (req, res) => {
        orderController.getOrders(req, res)
    })

    router.get('/orders/:id', verifyToken,(req, res) => {
        orderController.getOrderById(req, res)
    })

    router.post('/orders/complete', verifyToken,(req, res) => {
        orderController.completeOrder(req, res)
    })
}

module.exports = Ordenes