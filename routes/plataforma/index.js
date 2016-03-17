var express = require('express')
var app = express.Router()
var cloudinary = require('cloudinary')

var Users = require('../../models/usuarios')

// Vistas Principal de Usuario
app.get('/', function (req, res) {
	if(req.user) {
		res.render('./plataforma/index', {
			user: req.user
		})
	} else {
		res.redirect('/login')
	}
})

// Perfil de usuario
app.get('/about-me/:id', function (req, res) {
	var id = req.params.id
	Users.findById(id, function (err, usuario) {
		if(err) {
			return console.log('Error al encontrar usuario: ' + err)
		}
		res.render('./plataforma/about-me/perfil', {
			user: usuario
		})
	})
})

app.post('/about-me/edit/:id', function (req, res) {
	var id = req.params.id
	Users.findById(id, function (err, usuario) {
		if(err) {
			return console.log('Error al encontrar usuario: ' + err)
		}
		res.render('./plataforma/about-me/edit', {
			user: usuario
		})
	})
})

app.put('/about-me/edit/:id', function (req, res) {
	var id = req.params.id
	var data = {
		name: req.body.name,
		age: req.body.age,
		description: req.body.description,
		nickname: req.body.nickname
	}

	if(req.files.hasOwnProperty('avatar_perfil')) {
		cloudinary.uploader.upload(req.files.avatar_perfil.path, function (result) {
			data.photo = result.url

			Users.update({'_id': id}, data, function (err) {
				if(err) {
					return	res.send('Error al actualizar, porfavor contactanos para ayudarte!! ' + err)
				}
				Users.findById(id, function (err, usuario) {
					if(err) {
						return res.send('Error al encontrar usuario: ' + err)
					}
					// Relogin session passport
					req.login(usuario, function (err) {
						if(err) {
							return res.send('Error al encontrar relogear')
						}
					})

					// Render page edit
					res.render('./plataforma/about-me/edit', {
						user: usuario,
						msg: 'Se actualizo con Exito, Avatar Editado!!'	
					})

				})
			})

		},
		{ width: 800, height: 600, crop: "limit" })
	}  else {

		Users.update({'_id': id}, data, function (err) {
			if(err) {
				return	res.send('Error al actualizar, porfavor contactanos para ayudarte!! ' + err)
			}
			Users.findById(id, function (err, usuario) {
				if(err) {
					return res.send('Error al encontrar usuario: ' + err)
				}

				// Relogin session passport
				req.login(usuario, function (err) {
					if(err) {
						return res.send('Error al encontrar relogear')
					}
				})

				// Render page adit
				res.render('./plataforma/about-me/edit', {
					user: usuario,
					msg: 'Se actualizo con Exito!!'	
				})

			})
		})

	}
})

app.get('/about-me/edit/:id', function (req, res) {
	var id = req.params.id
	Users.findById(id, function (err, usuario) {
		if(err) {
			return console.log('Error al encontrar usuario: ' + err)
		}
		res.render('./plataforma/about-me/edit', {
			user: usuario
		})
	})
})

module.exports = app