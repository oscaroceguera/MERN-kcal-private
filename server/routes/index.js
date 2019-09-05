const express = require('express')
/* 
** Utilizamos la clase .Router para crear manejadores
** de rutas montables y modulares
*/
const router = express.Router()

const foodTypes = require('./foodTypes')
const mealtypes = require('./mealTypes')
const meal = require('./meal')

module.exports = app => {
  // paso 1
  router.get('/', (req, res) => {
    res.send('Hello from Express!')
  })

  router.post('/catalogs/foodTypes', foodTypes.addFoodType)
  router.get('/catalogs/foodTypes', foodTypes.getFoodTypes)

  router.post('/catalogs/mealTypes', mealtypes.addMealType)
  router.get('/catalogs/mealTypes', mealtypes.getMealType)

  router.post('/meals', meal.addMeal)
  router.get('/meals', meal.getMeals)
  router.get('/meals/:uuid', meal.getMealById)
  router.patch('/meals/:uuid', meal.updateMeal)
  router.delete('/meals/:uuid', meal.deleteMeal)


  // paso 2
  app.use('/api', router)
}