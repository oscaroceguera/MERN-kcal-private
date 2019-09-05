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

exports.getMeals = async (req, res) => {
  try {
    const meals = await Meal.find() // primero
      .populate('foods') // segundo
      .populate('mealType') // tercero
      .sort('-date') // ultimo

      res.send(meals)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getMealById = async (req, res) => {
  const { uuid } = req.params
  try {
    // Buscamos el detalle de la comida por uuid
    const meal = await Meal.findOne({ uuid })
      .populate('foods')
      .populate('mealType')
    
    if (!meal) return res.status(404).send()

    res.send(meal)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.updateMeal = async (req, res) => {
  const { params: { uuid }, body } = req
  let foods = []

  try {
    await Promise.all(body.foods.map(async (item) => {
      const result = await FoodType.findOne({ uuid: item })
      foods.push(result._id)
    }))

    body.foods = foods

    const mealType = await MealType.findOne({ uuid: body.mealType })
    body.mealType = mealType._id

    // https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
    // https://medium.com/@yugagrawal95/mongoose-mongodb-functions-for-crud-application-1f54d74f1b34
    // https://docs.mongodb.com/manual/reference/operator/update/set/
    /**
     * findOneAndUpdate: Se utilza para actualizar un registro en la colección
     * - (PRIMERO) busca el registro
     * - (SEGUNDO) Lo actualiza usando $set: Reemplaza el valor de un campo con un especifico valor, por eso body;
     * solo actulizará lo que contenga body, no cambiara lo quen o venga, tambien valida que no haya
     * alguna violación del tipo de campo.
     * - (TERCERO) Con el option {new: true} (true: es que devolverá un registro actualizado en respuesta)
     */
    const meal = await Meal.findOneAndUpdate({ uuid: uuid }, { $set: body }, { new: true })

    if (!meal) {
      return res.status(404).send()
    }

    res.send(meal)
  } catch (error) {
    res.status(400).send(error)
  }
}