const mg = require('./db.js')

const User = mg.model('User', mg.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minLength: [2, 'El nombre debe ser de largo al menos 2']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    minLength: [4, 'El email debe ser de largo al menos 4'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minLength: [4, 'La contraseña debe ser de largo al menos 4']
  }
}, {timestamps: true}))


module.exports = User