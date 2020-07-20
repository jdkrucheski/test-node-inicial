const  {Router}  = require('express')
const router = Router()

const {createUser, getUsers, updateUser, deleteUser} = require('./users.controller')

router.route('/user')
    .post(createUser)   // Crear usuario
    .get(getUsers)      // Listar todos los usuarios o listar según los filtros

router.route('/user:id')
    .put(updateUser)    // Actualizar usuario según su ID
    .delete(deleteUser) // Eliminar usuario según su ID

module.exports = router
