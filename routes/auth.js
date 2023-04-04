const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

const clave = 'miclavesecreta'

const router = Router()

router.post('/register', async function (req, res) {
  // 1. Obtengo los datos del formulario
  const {name, email, password, pass_confirm} = req.body

  // 2. Valido las contraseñas
  if (password != pass_confirm) {
    return res.json({error: 'Las contraseñas no coinciden'}, 401)
  }

  // 3. Intentamos ingresar el nuevo usuario
  try {
    const password_encriptado = await bcrypt.hash(password, 10)
    const new_user = await User.create({
      name: name,
      email: email,
      password: password_encriptado
    })
    // respuesta en caso de que todo esté bien
    return res.json({_id: new_user._id})
  }
  catch(error) {
    console.log(error)
    if (error.code == 11000) {
      // en este caso, el email ya está registrado
      return res.json({error: 'Este email ya se encuetra registrado'}, 401)
    }
    // respuesta en caso de un error de validación
    return res.json(error, 400)
  }

  res.json({registrese: 'acá'})
})

router.post('/login', async (req, res) => {
  // 1. Obtengo los datos del formulario
  const {email, password} = req.body

  // 2. Valido que usuario exista
  const user = await User.findOne({email: email})
  // 3. Verificamos que el usuario efectivamente exista
  if (user == null) {
    return res.json({error: 'Usuario inexistente'}, 404)
  }
  // 4. Verificamos que contraseña sea correcta
  const son_iguales = await bcrypt.compare(password, user.password)
  if (!son_iguales) {
    return res.json({error: 'Contraseña incorrecta'}, 404) 
  }
  // 5. El login fué exitoso, entonces creamos la credencial del VIP
  const token = jwt.sign({
    _id: user._id
  }, clave)

  // 6. Devolvemos el usuario y el token (la credencial)
  res.json({user: user, token: token})
})


function chequear_credenciales (req, res, next) {
  // 1. Validamos que tenga authorization en el Header
  if (!req.headers.authorization) {
    return res.json({error: 'Sin acceso'}, 401)
  }
  // 2. validamos que el token este correcto
  const token = req.headers.authorization.split(' ')[1]
  let es_valido;
  try {
    es_valido = jwt.verify(token, clave)
  }
  catch (error) {
    return res.json({error: 'Sin acceso'}, 401)
  }
  
  if (!es_valido) {
    return res.json({error: 'Sin acceso'}, 401)
  }
  // 3. Si llegamos hasta acá. Si tiene autorizacion
  next()
}


// "12345678" => "dsg6trdgfr6r56e5fe5e6ter"

module.exports = {router, chequear_credenciales}