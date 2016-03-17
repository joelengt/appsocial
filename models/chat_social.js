var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
	name: String,
	avatar: String,
	msg: String
})

var Mensajes =  mongoose.model('MensajesSocial', messageSchema)

module.exports = Mensajes