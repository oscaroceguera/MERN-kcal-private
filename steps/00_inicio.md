# Backend

## Crear carpeta sever

## Inicializar proyecto con npm

## Simple server http:

El módulo http para crear un servidor node.js

Cuando comizas a construir aplicaciones basadas en HTTP en Node.js, los módulos http/https incorparados con con los que se interactuan.

Para creat un http server en nodejs, necesitamos requerir el modulo http y vincular nuestro servidor al puerto que se escuchará en este caso al puerto 3000. 

```javascript
const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
  response.end('Hello Node.js Server!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
```

* requestHandler: Esta función será invocada cata vez que un request llegue al servidor. Si visitas `localhost:3000` desde tu browser, dos mensages apareceran: uno para `/` y otro para `favicon.icon`
* `if (err)`: manejador de errors, si el puesrto ya esta cocupado o por cualquier otro motivo nuestro servidor no puede inicairse, y se nos notifica aquí.

> **Correr el servidor** 
`$ node index.js`

El módulo http es de muy bajo nivel: crear una app web comleja utilizando solo lo anterior consume mucho tiempo. Esta es la ra
ázon por la que generalmente elegimos un framework para trabajar en nuestros proyectos. Hay muchas de los que se pueden elegir, estos son de los mas importantes: express, hapi, koa, restify.

Pero nosotros usaremos el mas popular el cual es express.js

  * https://blog.risingstack.com/your-first-node-js-http-server/
  * https://flaviocopes.com/node-http-server/

## Nuestro primer endpoint con express

**Instalar express y nodemon**

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
```

La mayor diferencia que debe notar aquí es que Express por defecto le ofrece un enrutador. No tiene que verificar manualmente la URL para decidir qué hacer, sino que define el enrutamiento de la aplicación con app.get, app.post, app.put, etc. Se traducen a los verbos HTTP correspondientes.

Uno de los conceptos más poderosos que implementa Express es el patrón de middleware.

## Correr express usando nodemon
## Crear archivo .gitignore

## ~Configurar eslint~
## ~Instalar nodemon~
## ~Instalar morgan~

# Frontend

**Crear carpeta cliente:**
  * Iniciar proyecto con npm para poder usar paquetes de node
  * carpeta src
  * archivo src/index.js
  * archivo src/index.html
  * archivo webpack.common.js
  * archivo webpack.dev.js
  * archivo webpack.prod.js
  * construir index.html
  * instalar dependencias:
    * `npm install --save react react-dom react-loadable react-router-dom`
    * react
    * [react-dom](https://www.npmjs.com/package/react-dom) (Sive como punto de entrada al DOM y alos procesadores del servidor para React.)
    * [react-loadable](https://github.com/jamiebuilds/react-loadable) (Es una HOC para cargar componentes de manera dinámica)
  * Crear hola mundo con react:
    * crear y construir **src/container/App/index.js** y **src/container/App/style.css**
  * Insertar en el DOM nuestra aplicacion en **src/index.js** normal, sin react-loadable
  * necesitamos configurar webpack para correr nuestra aplicacion
    * 

webpack
clean-webpack-plugin
html-webpack-plugin
webpack-merge
extract-text-webpack-plugin
webpack-bundle-analyzer
uglifyjs-webpack-plugin