var express = require('express')
var app = express.Router()
var cloudinary = require('cloudinary')

var Usuarios = require('../../../models/usuarios')

// READ todos los usuarios
app.get('/', function (req, res) {
	Usuarios.find(function (err, users) {
		if(err) {
			return res.send('Error, No se pudo encontrar usuarios guardados')
		}
		res.render('./admin/panel/users/index', {
			users: users
		})
	})
})

// Ver Detalles del Usuario
app.post('/detalle/:id', function (req, res) {
	var id = req.params.id
	Usuarios.findById({'_id':id}, function (err, user) {
		if(err) {
			return res.send('Usuario No encontrado: ' + err)
		}
		res.render('./admin/panel/users/detalle', {
			user: user
		})
	})
})

// DELETE usuario

app.delete('/delete/:id', function (req, res) {
	var id = req.params.id
	
	Usuarios.findById({'_id':id}, function (err, user) {
		if(err) {
			return res.send('Usuario No encontrado: ' + err)
		}
		// Confirmando nombre de usuario a borrar del mismo
		if(req.body.name_confirme == user.name) {
			// Borrando usuario
			Usuarios.remove({'_id':id}, function (err) {
				if(err) {
					return res.send('Error al borrar Usuario: ' + err)
				}

				res.redirect('/admin/panel/users')
			
			})
		} else {

			res.render('./admin/panel/users/detalle', {
				user: user,
				msg: 'El nombre no coincide, NO DELETE'
			})

		}

	})
})

// Update user admin
app.post('/update/:id', function (req, res) {
	var id = req.params.id
	Usuarios.findById({'_id':id}, function (err, user) {
		if(err) {
			return res.send('Usuario No encontrado: ' + err)
		}
		res.render('./admin/panel/users/update', {
			user: user
		})
	})
})


// Update
app.put('/update/:id', function (req, res) {
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

			Usuarios.update({'_id': id}, data, function (err) {
				if(err) {
					return	res.send('Error al actualizar, porfavor contactanos para ayudarte!! ' + err)
				}
				Usuarios.findById(id, function (err, user) {
					if(err) {
						return res.send('Error al encontrar usuario: ' + err)
					}

					// Relogin session passport
					req.login(user, function (err) {
						if(err) {
							return res.send('Error al encontrar relogear')
						}
					})

					res.render('./admin/panel/users/detalle', {
						user: user,
						msg: 'Se actualizo con Exito!!'	
					})

				})
			})

		},
		{ width: 800, height: 600, crop: "limit" })
	}  else {

		Usuarios.update({'_id': id}, data, function (err) {
			if(err) {
				return	res.send('Error al actualizar, porfavor contactanos para ayudarte!! ' + err)
			}
			Usuarios.findById(id, function (err, user) {
				if(err) {
					return res.send('Error al encontrar usuario: ' + err)
				}

				// Relogin session passport
				req.login(user, function (err) {
					if(err) {
						return res.send('Error al encontrar relogear')
					}
				})
					
				res.render('./admin/panel/users/detalle', {
					user: user,
					msg: 'Se actualizo con Exito!!'	
				})

			})
		})

	}
})

module.exports = app
