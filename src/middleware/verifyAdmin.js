const verifyAdmin = (req, res, next) => {
    if (req.user._doc && req.user._doc.admin) {
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = verifyAdmin