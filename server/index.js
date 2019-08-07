const express = require('express')
const app = express()
const port = 3000

// Express ofrece por defecto un enrutador, no tieme que verificar
// manualmente la URL, para decir que hacer, sino que define el 
// entutamiento de la aplciaion con app.get, app.post, app.put,
// Se traducen a los verbos HTTP correspondientes
app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})