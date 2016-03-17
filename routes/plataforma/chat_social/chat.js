var express = require('express')
var app = express.Router()

var Message = require('../../../models/chat_social')

// Chat con Rede Social
app.get('/', function (req, res) {

	Message.find(function (err, messages) {
		messages = messages.reverse()

		if(err) {
			return res.send('Error al leer los mensajes guardados: ' + err)
		}
		res.render('./plataforma/chat_social/chat_room', {
			user: req.user,
			messages: messages
		})
	})

})

module.exports = app