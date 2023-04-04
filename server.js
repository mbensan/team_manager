const express = require('express')
const cors = require('cors')

const app = express()

// para leer datos de formulario
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.use(cors())

app.use('/api', require('./routes/players.js'))
app.use('/api/auth', require('./routes/auth.js').router)

// cuando se inicia el servidor
app.listen(8000, () => console.log("Ejecutando en el puerto 8000"))