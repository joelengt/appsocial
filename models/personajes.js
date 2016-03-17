var mongoose = require('mongoose')
var Schema = mongoose.Schema

var personajeSchema = new Schema({
	name: String,
	serie_anime: String,
	age: String,
	sexo: String,
	cover: String,
	author_name: String,
	author_avatar: String
})

var personajes = mongoose.model('Personajes', personajeSchema)

module.exports = personajes