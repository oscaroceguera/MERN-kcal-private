require('./config/config')

const express = require('express')
/*
** instalamos morgan que es un http 
** request logger middleware para node
** $ npm install --save-dev morgan
*/
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { mongoose } = require('./db/mongoose')

const port = process.env.PORT

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

// movemos el acceso "/" a routes
// mandamos a llamar el archivo routes
const routes = require('./routes')

routes(app)

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})