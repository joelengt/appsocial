// require model chat
var Personajes = require('../models/personajes')

function chat (io) {

	io.on('connection', function (socket) {
		socket.on('new personaje', function (content) {
			// Guardando Personajes
			var pj = new Personajes({
				name: content.personaje.name,
				serie_anime: content.personaje.serie_anime,
				age: content.personaje.age,
				sexo: content.personaje.sexo,
				cover: content.personaje.cover,
				author_name: content.author.name,
				author_avatar: content.author.avatar
			})
			
			pj.save(function (err) {
				if(err) {
					return res.send('Error al guardar personaje: ' + err)
				}
			})

			content.personaje.id = pj._id

			io.emit('new personaje', content)
		})
	})

}

module.exports = chat