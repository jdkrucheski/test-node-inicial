const dbConnection = require('../database')
const {queryStringSelect, queryStringUpdate, queryStringCreate} = require('../helpers/helpers_users')
const userControl = {}

// Crear usuario
userControl.createUser = (req, res) => {
    let response = queryStringCreate(req)

    if (response.errors.length) {
        res.status(400).json({ "error": response.errors.join(", ") })
        return
    }

    dbConnection.run(response.sql, response.params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "Usuario guardado correctamente.",
            "data": {
                name: req.body.name,
                lastName: req.body.lastName,
                birthday: req.body.birthday,
                dni: req.body.dni
            }
        })
    })
}

// Listar usuarios (permite listar todos los usuarios o solamente los que cumplan con el filtro deseado)
userControl.getUsers = (req, res) => {
    let response = queryStringSelect(req.query)
    dbConnection.all(response.sql, response.params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            throw err
        }
        else {
            res.status(200).json(row)
        }
    })
}

// Actualizar usuarios.
userControl.updateUser = (req, res) => {
    let response = queryStringUpdate(req)
    dbConnection.run(response.sql, response.params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        else {
            if (this.changes > 0) {
                res.status(200).json({ "message": `Usuario con ID ${req.params.id} fué actualizado correctamente.` })
            }
            else {
                res.status(400).json({ "message": `No se encontró el usuario con ID ${req.params.id}.` })
            }
        }
    })
}

// Eliminar usuarios.
userControl.deleteUser = (req, res) => {
    const { id } = req.params
    dbConnection.run(`DELETE FROM User WHERE id = ?`, [id], function (err) {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else {
            if (this.changes > 0) {
                res.status(200).json({ "message": `Usuario con ID ${id} eliminado correctamente.` })
            }
            else {
                res.status(400).json({ "message": `El Usuario con ID ${id} no existe.` })
            }
        }
    })
}

module.exports = userControl