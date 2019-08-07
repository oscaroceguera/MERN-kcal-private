const http = require('http')
const port = 3000

// esta funcion sera invocada ccada vez que un request
// llegue al servidor.
const requestHandle = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

// Creamos el servidor
const server = http.createServer(requestHandle)

// Incializamos el servidor vinculando el puerto donde será escuchado
// recive el puerto y retorna un callback
server.listen(port, err => {
  // en caso de que el servidor no pueda iniciarse
  if(err) {
    return console.log('somethin bad happened', err)
  }

  // template string
  console.log(`Server is listening in ${port}`)
})