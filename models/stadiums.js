const mg = require('./db.js')

const Stadium = mg.model('Stadium', mg.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minLength: [2, 'El nombre debe ser de largo al menos 2']
  },
  image: {
    type: String,
    required: [true, 'La imagen es obligatorio'],
    minLength: [2, 'La imagen debe ser de largo al menos 4']
  }
}, {timestamps: true}))


module.exports = Stadium