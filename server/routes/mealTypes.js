const {MealType} = require('../models/mealType')
const mealTypes = require('../data/mealTypes.json')

exports.addMealType = async (req, res) => {
  try {
    const data = await MealType.insertMany(mealTypes)
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getMealType = async (req, res) => {
  try {
    const data = await MealType.find()
    res.send(data)
  } catch (error) {
    res.status(400).send(error)
  }
}
