/*
** obtenemos las variables de entorno, en caso de no
** se encuentre se setea por default development
*/
const env = process.env.NODE_ENV || 'development'

/*
** Validamos a cual BD vamos a acceder dependiendo
** el ambiente (produccion, development, test)
*/
if (env === 'development' || env === 'test') {
  // accedemos al archivo config.json
  const config = require('./config.json')
  // accedemos a los keys del json correspondiente al ambiente
  const envConfig = config[env]

  /*
  ** vamos a iterar sobre las keys del objeto
  ** para declararlas como variables de entorno
  */
  Object.keys(envConfig).forEach(key => {
    // process.env.PORT = envConfig.PORT
    // process.env.MONGODB_URI = envConfig.MONGODB_URI
    process.env[key] = envConfig[key]
  })
}