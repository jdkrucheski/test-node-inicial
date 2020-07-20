const helpers = {}

// Función para generar la petición de usuarios con los filtros solicitados.
helpers.queryStringSelect = (filters) => {
    const {
        name,
        lastName,
        contain,
        years_later,
        years_before
    } = filters

    let params = []
    let sql = `SELECT * FROM user WHERE`

    if (name) {
        params.push(name)
        sql = sql + ` name = ? AND`
    }

    if (lastName) {
        params.push(lastName)
        sql = sql + ` lastName = ? AND`
    }

    if (contain) {
        params.push('%' + contain + '%', '%' + contain + '%')
        sql = sql + ` name LIKE ? OR lastName LIKE ? AND`
    }

    if (years_later) {
        params.push(years_later)
        sql = sql + ` birthday > ? AND`
    }

    if (years_before) {
        params.push(years_before)
        sql = sql + ` birthday < ? AND`
    }

    sql = sql.slice(0, -3)
    return { sql, params }
}

// Función para generar la petición para actualizar un usuario determinado.
helpers.queryStringUpdate = (req) => {
    let params = []
    let sql = `UPDATE user SET `
    if (req.body.name) {
        params.push(req.body.name)
        sql = sql + ` name = ?,`
    }

    if (req.body.lastName) {
        params.push(req.body.lastName)
        sql = sql + ` lastName = ?,`
    }

    if (req.body.birthday) {
        params.push(req.body.birthday)
        sql = sql + ` birthday = ?,`
    }

    if (req.body.dni) {
        params.push(req.body.dni)
        sql = sql + ` dni = ?,`
    }

    if (!params.length) {
        res.status(400).json({ "error": "Se requiere al menos un valor para actualizar." })
        return
    }

    sql = sql.slice(0, -1)
    sql = sql + " WHERE id = ? "
    params.push(req.params.id)
    return { sql, params }
}

// Función para generar la petición para crear un usuario.
helpers.queryStringCreate = (req) => {
    let errors = []

    if (!req.body.name) {
        errors.push("Se requiere nombre")
    }

    if (!req.body.lastName) {
        errors.push("Se requiere apellido")
    }

    if (!req.body.birthday) {
        errors.push("Se requiere cumpleaños")
    }

    if (!req.body.dni) {
        errors.push("Se requiere dni")
    }

    if (errors.length) {
        return { errors }
    }

    let params = [req.body.name, req.body.lastName, req.body.birthday, req.body.dni]
    let sql = 'INSERT INTO User (name, lastName, birthday, dni) VALUES (?,?,?,?)'

    return { sql, params, errors }
}

module.exports = helpers