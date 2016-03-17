var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
	user: String,
	msg: String,
	colorName: String
})

var message = mongoose.model('messages', messageSchema)

module.exports = message
