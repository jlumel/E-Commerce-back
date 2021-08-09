const sendMail = require('../service/nodemailer.service')

const register = (app) => {

    app.get('/register', (req, res)=> {
        res.render('register')
    })

    app.get('/failregister', (req, res) => {
        res.render('./failRegister')
    })

    app.post('/register', (req, res) => {
       
        sendMail('register',req.body, [])
        res.redirect('/')
    })

}

module.exports = register