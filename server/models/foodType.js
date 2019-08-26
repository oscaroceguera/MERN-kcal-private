/*
** Es una herramienta de modelado de objetos para mongoDB
** diseñada para trabajar en un entorno asíncrono
*/
const mongoose = require('mongoose')
/*
** simple, rapido generador de Universal Unique IDentifier
** o Identificador único universal
*/
const {v4} = require('uuid')

/*
** Creamos nuestra coleccion de comida
** tenemos que declara nuestro esquema, que son los datos
** que permitira almacenar en nuestra coleccion
*/
const FoodTypeSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: v4
  },
  label: {
    type: String
  },
  kcal: {
    type: String
  },
  type: {
    type: String
  }
}, { timestamps: true }) // timestamps crea createdAt y updateAt

const FoodType = mongoose.model('FoodType', FoodTypeSchema)
module.exports = { FoodType }