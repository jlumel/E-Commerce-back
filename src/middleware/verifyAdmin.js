const verifyAdmin = (req, res, next) => {
    if (req.session.user.admin) {
        next()
    } else {
        res.sendStatus(401)
    }
}

module.exports = verifyAdmin