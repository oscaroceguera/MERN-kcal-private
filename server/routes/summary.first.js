const { Meal } = require('../models/meal')
const { FoodType } = require('../models/foodType')

// **** FISRT ***

// TODO: Explicar aggregate primero por dia, seungo por mes, trecero por año

const flatten = items => items.reduce((a, b) => a.concat(b), [])
const sumKcals = item => item.reduce((total, value) => total + value, 0)

const totalKcals = kcals => {
  const flattenKcals = flatten(kcals)
  return sumKcals(flattenKcals)
}

exports.getByYear = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'foods',
          foreignField: '_id',
          as: 'foods'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' }
          },
          calories: { $push: '$foods.kcal' },
          quantityMeals: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1
        }
      }
    ])

    const newData = data.map(item => {
      console.log("TCL: exports.getByYear -> item", item.calories)
      return {
        dia: item._id.dayOfMonth,
        mes: item._id.month,
        año: item._id.year,
        /**
         * Primero => flatten: Quitamos corchetes de array [[],[]] para juntar todos los resultados
         * Segundo => reduce para aplciarle la suma de calorias
         */
        totalKcal: totalKcals(item.calories),
        quantityMeals: item.quantityMeals
      }
    })
    console.log("TCL: exports.getByMonth -> newData", newData)

    res.send(newData)

  } catch (error) {
    res.status(500).send(error)
  }
}

exports.getByMonth = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'foods',
          foreignField: '_id',
          as: 'foods'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          calories: { $push: '$foods.kcal' },
          quantityMeals: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ])

    const newData = data.map(item => {
      return {
        dia: item._id.dayOfMonth,
        mes: item._id.month,
        año: item._id.year,
        /**
         * Primero => flatten: Quitamos corchetes de array [[],[]] para juntar todos los resultados
         * Segundo => reduce para aplciarle la suma de calorias
         */
        totalKcal: totalKcals(item.calories),
        quantityMeals: item.quantityMeals
      }
    })
    console.log("TCL: exports.getByMonth -> newData", newData)

    res.send(newData)

  } catch (error) {
    res.status(500).send(error)
  }
}

exports.getByDay = async (req, res) => {
  try {
    const data = await Meal.aggregate([
      {
        $lookup: {
          from: 'foodtypes',
          localField: 'foods',
          foreignField: '_id',
          as: 'foods'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' },
            dayOfMonth: { $dayOfMonth: '$date' }
          },
          calories: { $push: '$foods.kcal' },
          quantityMeals: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1,
          '_id.day': -1
        }
      }
    ])

    const newData = data.map(item => {
      // console.log("TCL: exports.getByDay -> item", item)
      return {
        dia: item._id.dayOfMonth,
        mes: item._id.month,
        año: item._id.year,
        /**
         * Primero => flatten: Quitamos corchetes de array [[],[]] para juntar todos los resultados
         * Segundo => reduce para aplciarle la suma de calorias
         */
        totalKcal: totalKcals(item.calories),
        quantityMeals: item.quantityMeals
      }
    })
    console.log("TCL: exports.getByDay -> newData", newData)

    res.send(newData)

  } catch (error) {
    res.status(500).send(error)
  }
}



