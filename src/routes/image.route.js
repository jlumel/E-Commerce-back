const uploadImage = require('../middleware/uploadImage')
const imageController = require('../controllers/image.controller')
const verifyAdmin = require('../middleware/verifyAdmin')
const verifyToken = require('../middleware/verifyToken')


const Images = router => {

    router.post("/image/upload",verifyToken, verifyAdmin, uploadImage.single("file"), async (req, res) => {
        imageController.uploadImage(req, res)
    })

}

module.exports = Images