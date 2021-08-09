const ordertController = require('../controllers/order.controller')
const verifyToken = require('../middleware/jwt')

const Ordenes = router => {

    router.get('/orders', (req, res) => {

    })

    router.post('/orders/complete', (req, res) => {


    })

    router.get('/orders/:id', (req, res) => {

    })

}

module.exports = Ordenes