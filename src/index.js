require ('dotenv').config()
const express = require('express')
const app = express()

// Setrings
app.set('puerto', process.env.PORT || process.env.PORT_DEV)

// Middlewares
app.use(express.json())

// Routes
app.use(require('./resources/users.routes'))

app.listen(app.get('puerto'), ()=>{
    console.log(`Escuchando puerto ${app.get('puerto')}`)
})
