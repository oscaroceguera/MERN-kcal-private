const {FoodType} = require('../models/foodType')
const foodTypes = require('../data/foodTypes.json')

exports.addFoodType = async (req, res) => {
  // FIRST
  // console.log('BODY ===>', req.body)
  try {

    // FIRST
    // const meal = new FoodType(req.body)
    // const doc = await meal.save()
    // res.send(doc)

    // SECOND
    const data = await FoodType.insertMany(foodTypes)
    res.send(data)
    
  } catch (error) {
    //  400: Bad request
    res.status(500).send(error)
  }
}

exports.getFoodTypes = async (req, res) => {
  try {
    const data = await FoodType.find()

    res.send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}