# Backend

* Crear configuraciones para mongoDB y PORT con variables de entorno
* Creamos carpeta **config** con **config.js** y **config.json**, para nuestras variables de entorno del server
* Crear conexion de mongoDB creamos **db/mongoose.js**
* Añadimos la configuracion y la conexion a Mongo en index.js
* Crear carpeta models
* Crear modelo de para el **catalogo tipo de comida (foodType)**
* Instalar dependencia de **mongoose** *(Es una herramienta de modelado de objetos para mongoDB diseñada para trabajar en un entorno asíncrono)*
* Instalar dependencia **uuid** (simple, rapido generador de Universal Unique IDentifier o Identificador único universal)
* `$ npm install --save mongoose uuid`
* Acomodar las rutas en otra carpeta usando el router de express y configurarlas en index.js
* movemos el EP de **/** al routes/index.js
* Crear controlador para agregar un tipo de comida a mongodb **routes/foodTypes.js**
* crear **POST** en router
* hacer una peticion POST `http http://localhost:5000/api/catalogs/foodTypes label=algo` vemos que label algo es undefined y tenemos que instalar body-parser en index
* una vez agregado el body-parser probar que se agrega `http http://localhost:5000/api/catalogs/foodTypes label=Piña kcal=123 type=FRUTAS` y fijarse en el mongo
* Modificar Controlador para agregar dinamicamente el catalogo:
  1. Crear carpeta **data** y archivo **foodTypes.json** con los datos del catalogo, para agregarlos despues con un POST ala base de datos.
  2. modificar controlador para hacer un insertMany del JSON (esto insertara los datos cuando haga el post a `http -f POST http://localhost:5000/api/catalogs/foodTypes`) 
* Crear controlador y ruta para listar el catalogo foodTypes
* tipo de comida MealType:
  * Crear modelo
  * Crear controlador (ADD/GET) y data.json
  * creat route (POST/GET)
* Comida **Meal**:
  * Crear Modelo
  * Crear controlador (ADD)
  * Crear ruta (POST)
  * Probarlo insertando datos con **postman**

---

# Frontend

* Tenemos que crear la seccion para agregar comida:
  * Configurar el uso de rutas con react-router-dom en `src/index.js`
  * Mover archivo **index.js** fuera de la **carpeta App** y renombrarlo a **App.js**, quedaría `src/container/App.js`
  * crear carpeta **pages** con carpetas (Calories, Dashboard, Summary) con un ccomponente base
  * Configurar nuestro router y rutas en **App.js**
  * Activar en **webpack.dev.js** `historyApiFallback: true` para poder hacer refresh y acceder a rutas por medio del browser

  * Usaremos react-loadable para usar coding spliting en `src/index.js`, es un HOC para cargar componentes dinamicamente (cuando webpack hace build de nuestra aplicación obtenemos una construccion completa de nuestra app, y con coding-spliting solo carga lo qu ese necesita y solo una vez), fijarse en el webpack-analizer.
  * Usamos react-loadable para hacer coding-spliting de nuestras rutas en `src/container/App.js`
