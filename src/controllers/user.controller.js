const userModel = require('../models/user.model')

const userController = {
    getUsers: (req, res) => {
        userModel.find({})
            .then(users => res.send(users))
            .catch((err) => {
                res.send({error: 1, descripcion: "No hay usuarios cargados"})
                errorLog.error(err)
            })
    },

    addUser: (req, res) => {

        const { username, password, email, firstName, lastName, address, age, phone, admin=false } = req.body
        const user = {
            username,
            password,
            email,
            firstName,
            lastName,
            address,
            age,
            phone,
            admin
        }
        const nuevoUsuario = new userModel(user)
        nuevoUsuario.save()
            .then(() => res.sendStatus(201))
            .catch((err) => {
                res.send({error: 2, descripcion: "Error al cargar el usuario"})
                errorLog.error(err)
            })
    },

    getUserById: (req, res) => {
        const id = req.params.id
        userModel.find({ "_id": id })
            .then(user => res.send(user))
            .catch((err) => {
                res.send({error: 3, descripcion: "Usuario no encontrado"})
                errorLog.error(err)
            })
    },

    getUserByUsername: (req, res)=> {
        const {username} = req.body.username
        userModel.find({username: {$regex: `${username}`, $options: "$i"}})
            .then(user => res.send(user))
            .catch((err) => {
                res.send({error: 3, descripcion: "Usuario no encontrado"})
                errorLog.error(err)
            })
    },

    updateUser: (req, res) => {
        const id = req.params.id
        const { username, password, email, firstName, lastName, address, age, phone, admin=false } = req.body
        const user = {
            username,
            password,
            email,
            firstName,
            lastName,
            address,
            age,
            phone,
            admin
        }
        userModel.updateOne({ "_id": id },
            {
                $set: { ...user }
            }
        )
            .then(user => res.send(user))
            .catch((err) => {
                res.send({error: 4, descripcion: "No se pudo actualizar el usuario"})
                errorLog.error(err)
            })
    },

    removeUser:(req, res) => {
        const id = req.params.id
        userModel.deleteOne({ "_id": id })
            .then(() => res.sendStatus(204))
            .catch((err) => {
                res.send({error: 5, descripcion: "No se pudo eliminar el usuario"})
                errorLog.error(err)
            })
    }
}

model.exports = userController