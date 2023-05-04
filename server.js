const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const app = express()

app.use(fileUpload())
app.use('/static', express.static('static'));

// para leer datos de formulario
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use(cors())

app.use('/api', require('./routes/players.js'))
app.use('/api/auth', require('./routes/auth.js').router)
app.use('/api/stadiums', require('./routes/stadiums.js'))

// cuando se inicia el servidor
app.listen(8000, () => console.log("Ejecutando en el puerto 8000"))