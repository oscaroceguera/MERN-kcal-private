const supertest = require('supertest')
const { app } = require('../index')
const { Meal } = require('../models/meal')

function test() {
  return supertest(app)
}

const myMealIncorrectTypes = {
  foods: 'Camaron',
  mealType: ['uno', 'dos']
}

const myMeal = {
  meal: 'pozole', 
  foods: [
    "5d7c117c0cb02787b15a5371",
    "5d7c117c0cb02787b15a5372",
    "5d7c117c0cb02787b15a5373"
  ],
  mealType: '5d7c1209c7635688b095b2d0'
}

const myMealWithUUIDCatalogs = {
  meal: 'pozole', 
  foods: [
    "bf5e2eda-2a6b-4014-b5fc-64f25fd340da",
    "c9a6152e-735e-45eb-a8c5-07f2295aa5b1",
    "29c9adba-03d0-4e14-8dbf-85fe28a66b4a"
  ],
  mealType: '9907ffd2-0c3e-4540-b9e5-2530262eb81e'
}

describe('Meal [Model]', () => {
  it('Should return error is required are missing', (done) => {
    const meal = new Meal({})
    // https://docs.mongodb.com/manual/reference/method/db.collection.validate/

    meal.validate((error) => {
      const { mealType, meal } = error.errors

      expect(meal).not.toBeNull()
      expect(meal.kind).toBe('required')
      expect(mealType).not.toBeNull()
      expect(mealType.kind).toBe('required')
      done()
    })
  })

  it('Should return error is invalid type', (done) => {
    const meal = new Meal(myMealIncorrectTypes)

    meal.validate((error) => {
      const { mealType, meal, foods } = error.errors

      expect(meal).not.toBeNull()
      expect(meal.kind).toBe('required')
      expect(mealType).not.toBeNull()
      expect(mealType.kind).toBe('ObjectID')
      expect(foods).not.toBeNull()
      expect(foods.kind).toBe('Array')
      done()
    })
  })

  it('Should save a meal', (done) => {
    const newMeal = new Meal(myMeal)

    expect(newMeal).toHaveProperty('uuid')
    expect(newMeal.meal).toBe(myMeal.meal)
    expect(newMeal).toHaveProperty('date')
    expect(newMeal).toHaveProperty('foods')
    expect(newMeal).toHaveProperty('mealType')
    done()
  })
})

describe('POST /meals', () => {
  it('Should not create meal with invalid data', async() => {
    await test()
      .post('/api/meals')
      .send({})
      .expect(500)
  })

  it('Should not create meal with invalid types', async () => {
    await test()
      .post('/api/meals')
      .send(myMeal)
      .expect(500)
  })

  it('Should create a new meal', async () => {
    await test()
      .post('/api/meals')
      .send(myMealWithUUIDCatalogs)
      .expect(200)
      .expect( res => {
        expect(res.body.meal).toBe(myMealWithUUIDCatalogs.meal)
        expect(res.body.mealType).toBe(myMeal.mealType)
        expect(res.body.foods.length).toBe(myMeal.foods.length)
        expect(res.body.foods).toEqual(expect.arrayContaining(myMeal.foods))
      })
  })
})

describe('GET /meals', () => {
  it('Should get all meals', async () => {
    await test()
      .get('/api/meals')
      .expect(200)
      .expect(res => {
        res.body.map(item => {

          expect(item).toHaveProperty('uuid')
          expect(item).toHaveProperty('meal')
          expect(item).toHaveProperty('date')

          expect(item).toHaveProperty('foods')
          expect(item.foods[0]).toHaveProperty('uuid')
          expect(item.foods[0]).toHaveProperty('label')
          expect(item.foods[0]).toHaveProperty('kcal')
          expect(item.foods[0]).toHaveProperty('type')

          expect(item).toHaveProperty('mealType')
          expect(item.mealType).toHaveProperty('uuid')
          expect(item.mealType).toHaveProperty('value')
        })
      })
  })
})

describe('GET /meals/:id', () => {
  it('should not get a meal detail with wrong id param', async () => {
    await test()
      .get('/api/meals/123-123')
      .expect(404)
  })

  it('should get a meal detail', async () => {
    await test()
      .get('/api/meals/e67ad3b8-57f5-4692-9e2b-7fe8c13f5855')
      .expect(200)
  })
  // it('Should get all meals', async () => {
  //   await test()
  //     .get('/api/meals')
  //     .expect(200)
  //     .expect(res => {
  //       res.body.map(item => {

  //         expect(item).toHaveProperty('uuid')
  //         expect(item).toHaveProperty('meal')
  //         expect(item).toHaveProperty('date')

  //         expect(item).toHaveProperty('foods')
  //         expect(item.foods[0]).toHaveProperty('uuid')
  //         expect(item.foods[0]).toHaveProperty('label')
  //         expect(item.foods[0]).toHaveProperty('kcal')
  //         expect(item.foods[0]).toHaveProperty('type')

  //         expect(item).toHaveProperty('mealType')
  //         expect(item.mealType).toHaveProperty('uuid')
  //         expect(item.mealType).toHaveProperty('value')
  //       })
  //     })
  // })
})