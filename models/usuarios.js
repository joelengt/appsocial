var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	provider_id: String,
	provider: String,
	name: String,
	photo: String,
	age: String,
	description: String,
	nickname: String,
	createdAt: {type: Date, default: Date.now}
})

var usuarios = mongoose.model('Usuarios', userSchema)

module.exports = usuarios