var mongoose = require('mongoose')

/*
** para versiones abajo de mongo 5, necesitamos
** declarar globalmente el uso de promesas
*/
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
mongoose.set('useCreateIndex', true) // crea automaticamente indexs

module.exports = {mongoose}