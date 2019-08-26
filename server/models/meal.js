const mongoose = require('mongoose')
const {v4} = require('uuid')

/*
** Creamos nuestra coleccion de comida
** tenemos que declara nuestro esquema, que son los datos
** que permitira almacenar en nuestra coleccion
*/
const MealSchema = new mongoose.Schema({
  uui: {
    type: String,
    default: v4
  },
  meal: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  foods: [{ // array que recive varios datos 
    type: mongoose.Schema.Types.ObjectId, // tipo ObjectId del catalogo
    ref: 'FoodType'
  }],
  mealType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MealType'
  },
}, {
  timestamps: true
})

const Meal = mongoose.model('Meal', MealSchema)
module.exports = {
  Meal
}