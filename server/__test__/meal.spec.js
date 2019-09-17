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
        const {meal, mealType, foods} = res.body

        expect(meal).toBe(myMealWithUUIDCatalogs.meal)
        expect(mealType).toBe(myMeal.mealType)
        expect(foods.length).toBe(myMeal.foods.length)
        expect(foods).toEqual(expect.arrayContaining(myMeal.foods))
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
          const { foods, mealType } = item

          expect(item).toHaveProperty('uuid')
          expect(item).toHaveProperty('meal')
          expect(item).toHaveProperty('date')

          expect(item).toHaveProperty('foods')
          expect(foods[0]).toHaveProperty('uuid')
          expect(foods[0]).toHaveProperty('label')
          expect(foods[0]).toHaveProperty('kcal')
          expect(foods[0]).toHaveProperty('type')

          expect(item).toHaveProperty('mealType')
          expect(mealType).toHaveProperty('uuid')
          expect(mealType).toHaveProperty('value')
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
      .get('/api/meals/297dcb86-0303-41d3-95bd-bed8ccc813c8')
      .expect(200)
      .expect(res => {
        const { body } = res
        const { foods, mealType } = body

        expect(body).toHaveProperty('uuid')
        expect(body).toHaveProperty('meal')
        expect(body).toHaveProperty('date')

        expect(body).toHaveProperty('foods')
        expect(foods[0]).toHaveProperty('uuid')
        expect(foods[0]).toHaveProperty('label')
        expect(foods[0]).toHaveProperty('kcal')
        expect(foods[0]).toHaveProperty('type')

        expect(body).toHaveProperty('mealType')
        expect(mealType).toHaveProperty('uuid')
        expect(mealType).toHaveProperty('value')
      })
  })
})

describe('UPDATE /meals/:id', () => {
  it('should not get a meal detail with wrong id param', async () => {
    await test()
      .get('/api/meals/123-123')
      .expect(404)
  })

  it('Should updated a meal successfully', async () => {
    const data = {
      meal: 'Pozole Update 2',
      foods: [
        // 5d7c117c0cb02787b15a53d6
        '59980542-fa8b-4fdb-9787-4411995a5d8b',
        // 5d7c117c0cb02787b15a53df
        '5d38cea0-92a0-4724-8a9b-f25c6fae2d9c',
        // 5d7c117c0cb02787b15a53e3
        '2742d71a-1517-4238-b064-de802417cb18'
      ],
      // 5d7c1209c7635688b095b2d1
      mealType: '56689b29-b266-4931-ad3c-1ca323831d8a'
    }

    await test()
      .patch('/api/meals/297dcb86-0303-41d3-95bd-bed8ccc813c8')
      .send(data)
      .expect(200)
      .expect(res => {
        const {meal, mealType, foods} = res.body
        const arrayContaining = (item) => expect.arrayContaining([item])

        expect(meal).toBe(data.meal)
        expect(mealType).toBe('5d7c1209c7635688b095b2d1')
        expect(foods).toEqual(arrayContaining('5d7c117c0cb02787b15a53d6'))
        expect(foods).toEqual(arrayContaining('5d7c117c0cb02787b15a53df'))
        expect(foods).toEqual(arrayContaining('5d7c117c0cb02787b15a53e3'))
      })
  })
})

describe('DELETE /meals/:id', () => {
  it('should no get a meal detail wrong id param', async () => {
    await test()
      .get('/api/meals/123-123')
      .expect(404)
  })

  it('Should deleted a meal successfully', async () => {
    const data = {
      meal: 'Ceviche nice',
      foods: [
        "bf5e2eda-2a6b-4014-b5fc-64f25fd340da",
        "c9a6152e-735e-45eb-a8c5-07f2295aa5b1",
        "29c9adba-03d0-4e14-8dbf-85fe28a66b4a"
      ],
      mealType: '9907ffd2-0c3e-4540-b9e5-2530262eb81e'
    }

    let uuid

    await test()
      .post('/api/meals')
      .send(data)
      .expect(200)
      .expect(res => uuid = res.body.uuid)

    await test()
      .delete(`/api/meals/${uuid}`)
      .expect(200)
  })
})