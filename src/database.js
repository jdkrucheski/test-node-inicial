const sqlite3 = require('sqlite3').verbose();

let dbConnection = new sqlite3.Database('./db/users', (err) => {
    if (err) {
        console.error(err.message);
        return
    }
    else {
        console.log('Conectando a la base de datos de usuarios.');
    }
})

module.exports = dbConnection


