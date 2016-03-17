// require model chat
var Message = require('../models/chat_social')

function chat (io) {
	io.on('connection', function (socket) {
		socket.on('chat message social', function (content) {
			// Guardando Datos Message
			var mensaje = new Message({
				name: content.name,
				avatar: content.avatar,
				msg: content.msg
			})
			
			mensaje.save(function (err) {
				if(err) {
					return res.send('Error al guardar mensaje: ' + err)
				}
			})
			content.id = mensaje._id
			io.emit('chat message social', content)
		})
	})

	// User Connected
	io.on('connection', function (socket) {
		console.log('User Connected to chat social')
		socket.on('disconnected', function () {
			console.log('User disconnected to chat social')
		})
	})
}

module.exports = chat