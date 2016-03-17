var express = require('express')
var app = express.Router()

var Message = require('../../../models/chat')

var config = require('../../../config')

var user = {
	name: config.admin.name,
	pass: config.admin.pass
}

// Chat Normal
app.post('/', function (req, res) {
	if(req.body.nombre === user.name && req.body.clave === user.pass) {

		Message.find(function (err, messages) {
			if(err) {
				return console.log('Error al leer menssages: ' + err)
			}
			
			messages = messages.reverse()

			res.render('./plataforma/chat', {
				messages: messages
			})
			
		})

	} else {

		res.render('./login/login_form', {
			msg: 'Los datos No coinciden!!. Intente nuevamente'
		})
		
	}
})

module.exports = app