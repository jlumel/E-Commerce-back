const imageController = {

    uploadImage: (req, res) => {
        if (!req.file) {
            return res.send('You must select a file')
        }
        const imgUrl = `http://localhost:8080/images/${req.file.filename}`;
        return res.send(imgUrl)
    }

}

module.exports = imageController