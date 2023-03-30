const mg = require('./db.js')

const Player = mg.model('Player', mg.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minLength: [2, 'El nombre debe ser de largo al menos 2']
  },
  position: String,
  game1: {
    type: String,
    default: 'undefined'
  },
  game2: {
    type: String,
    default: 'undefined'
  },
  game3: {
    type: String,
    default: 'undefined'
  }
}, {timestamps: true}))


module.exports = Player