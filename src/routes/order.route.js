const orderController = require('../controllers/order.controller')
const verifyToken = require('../middleware/jwt')

const Ordenes = router => {

    router.get('/orders',(req, res) => {
        orderController.getOrderById(req, res)
    })

    router.post('/orders/complete', (req, res) => {
        orderController.completeOrder(req, res)
    })

    router.get('/orders/:id', (req, res) => {
        orderController.getOrderById(req, res)
    })

}

module.exports = Ordenes