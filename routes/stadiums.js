const {Router} = require('express')
const Stadium = require('../models/stadiums')

const router = Router()

router.post('/', async function (req, res) {
  // 1. Obtengo los datos del formulario
  const {name} = req.body
  const {image} = req.files
  console.log({name, image})

  if (!image) {
    return res.json({todo: 'Mal'}, 400)
  }

  const newStadium = await Stadium.create({
    name: name,
    image: image.name
  })
  const extension = image.name.split('.')[1]
  const filename = newStadium._id + '.' + extension

  image.mv(__dirname + '/../static/stadiums/' + filename)
  
  await Stadium.updateOne({_id: newStadium._id}, {$set: {image: filename}})

  return res.json({todo: 'ok'})
})

module.exports = router