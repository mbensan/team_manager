const {Router} = require('express')
const Player = require('../models/players')

const router = Router()

router.get('/', (req, res) => {
  res.json({message: 'Saludos desde el Servidor'}) 
})

router.post('/players', async (req, res) => {
  // 1. Obtenemos los campos del formulario
  const {name, position} = req.body

  try {
    const player = await Player.create({
      name: name,
      position: position
    })
    // respuesta en caso de que todo esté bien
    return res.json({_id: player._id})
  }
  catch(error) {
    console.log(error)
    // respuesta en caso de un error de validación
    return res.json(error, 400)
  }
})

// ruta para obtener todas las players
router.get('/players', async (req, res) => {
  const players = await Player.find()
  res.json({players})
})

// ruta para borrar players
router.delete('/players/:id', async (req, res) => {
  const id = req.params.id
  await Player.deleteOne({_id: id})
  res.json({eliminado: 'ok'})
})


// exportamos nuestra ruta
module.exports = router


