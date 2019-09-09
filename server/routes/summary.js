const { Meal } = require('../models/meal')
const { FoodType } = require('../models/foodType')

// **** FISRT ***
/**
 * La otra opción,Aggregation Framework, apareció con la versión 2.2 de MongoDB para
 * poder realizar cálculos de agregación de forma parecida a los que hacemos en las bases
 * de datos relacionales. Aunque MapReduce es más potente, también es más difícil de
 * utilizar así que para realizar cálculos sencillos es más conveniente utilizar
 * Aggregation Framework.
 * 
 * Partes de una consulta de agregación => db.people.aggregate( [<pipeline>] )
 * ¿Qué significa pipeline? Los pipelines o tuberías, son similares a las que se
 * utilizan en la línea de comandos de los sistemas Unix, pasando los resultados
 * de un comando a otro para producir resultados de forma conjunta. En el caso de
 * MongoDB se passan los resultados de un pipeline que usa un operador de Aggregation
 * Framework al siguiente pipelinepara que los procese.
 * 
 * $project : se utiliza para modificar el conjunto de datos de entrada, añadiendo,
 * eliminando o recalculando campos para que la salida sea diferente.

 * $match: filtra la entrada para reducir el número de documentos, dejando solo
 * los que cumplan las condiciones establecidas.
 * 
 * $group: agrupa documentos según una determinada condición.
 * 
 * $sort: ordena un conjunto de documentos según el campo especificado.
 */
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
        day: item._id.dayOfMonth,
        month: item._id.month,
        year: item._id.year,
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
        day: item._id.dayOfMonth,
        month: item._id.month,
        year: item._id.year,
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

/**
 * AGGREGATE https://charlascylon.com/2013-10-10-tutorial-mongodb-introduccion-aggregation-framework
 * 
 * 
 */

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
          '_id.dayOfMonth': -1
        }
      }
    ])

    const newData = data.map(item => {
      // console.log("TCL: exports.getByDay -> item", item)
      return {
        day: item._id.dayOfMonth,
        month: item._id.month,
        year: item._id.year,
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



