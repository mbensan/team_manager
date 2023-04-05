const {Router} = require('express')
const Player = require('../models/players')
const { chequear_credenciales } = require('./auth')

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
//router.get('/players', chequear_credenciales, async (req, res) => {
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

router.put('/players/:id/games/:num', async (req, res) => {
  const id = req.params.id
  const num = req.params.num

  const {value} = req.body

  const game_str = 'game' + num
  await Player.updateOne({_id: id}, {$set: {[game_str]: value}})
  res.json({todo: 'ok'})
})


// exportamos nuestra ruta
module.exports = router


