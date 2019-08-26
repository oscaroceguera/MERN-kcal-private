const { Meal } = require('../models/meal')
const { FoodType } = require('../models/foodType')
const { MealType } = require('../models/mealType')

exports.addMeal = async (req, res) => {
  try {
    let foods = []

    /*
    ** Foods como es un array puede contener muchos items
    ** lo que hacemos aca es recorrer el array de uuids [uuid1, uuid2, uuidn]
    ** para obtener su objectId y almacenarlos en foods[]
    */
    await Promise.all(req.body.foods.map(async item => {
      const result = await FoodType.findOne({uuid: item})
      foods.push(result._id)
    }))

    req.body.foods = foods

    const mealType = await MealType.findOne({uuid: req.body.mealType})
    req.body.mealType = mealType._id

    const meal = new Meal({
      meal: req.body.meal,
      date: req.body.date,
      foods: req.body.foods,
      mealType: req.body.mealType
    })

    const doc = await meal.save()
    res.send(doc)
  } catch (error) {
    console.log("TCL: exports.addMeal -> error", error)
    res.status(400).send(error)
  }
}