var express = require('express')
var app = express.Router()

var Messages = require('../../../models/chat_social')

app.get('/', function (req, res) {
	Messages.find(function (err, messages) {
		if(err) {
			return res.send('No se encontraron Menssages Guardados: ' + err)
		}
		messages = messages.reverse()

		res.render('./admin/panel/msgs/index', {
			messages: messages
		})
	})
})

app.delete('/delete/:id', function (req, res) {
	var id = req.params.id
	Messages.remove({'_id':id}, function (err) {
		if(err) {
			return res.send('Error al borrar menssage: ' + err)
		}
		res.redirect('/admin/panel/msgs')
	})
})

module.exports = app