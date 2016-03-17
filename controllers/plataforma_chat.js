// require model chat normal
var Message = require('../models/chat')

function chat (io) {
	io.on('connection', function (socket) {
		socket.on('chat message', function (content) {
			// Guardando Datos Message
			var mensaje = new Message({
				user: content.user,
				msg: content.msg,
				colorName: content.colorName
			})
			
			mensaje.save(function (err) {
				if(err) {
					return console.log('Error al guardar mensaje: ' + err)
				}
			})

			io.emit('chat message', content)
		})
	})

	// User Connected
	io.on('connection', function (socket) {
		console.log('User Connected')
		socket.on('disconnected', function () {
			console.log('User disconnected')
		})
	})
}

module.exports = chat