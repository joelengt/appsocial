var express = require('express')
var cloudinary = require("cloudinary")
var app = express.Router()

var Personajes = require('../../../models/personajes')

// Leer Personajes guardados
app.get('/', function (req, res) {
	Personajes.find(function (err, personajes) {
		personajes = personajes.reverse()
		if(err) {
			return res.send('Error al leer personajes guardados: ' + err)
		}
		res.render('./plataforma/personajes/index', {
			user: req.user,
			personajes: personajes
		})
	})
})

// Detalles del personaje
app.get('/detalles/:id', function (req, res) {
	var id = req.params.id
	Personajes.findById({'_id':id}, function (err, personaje) {
		if(err) {
			return res.send('Error al buscar al personaje: ' + err)
		}
		res.render('./plataforma/personajes/detalles' , {
			user: req.user,
			personaje: personaje
		})
	})
})

// Crear Nuevo Personaje
app.post('/add', function (req, res) {
	var pj = new Personajes({
		name: req.body.name,
		serie_anime: req.body.serie_anime,
		age: req.body.age,
		sexo: req.body.sexo,
		cover: req.body.cover,
		author_name: req.user.name,
		author_avatar: req.user.photo
	})
	pj.save(function (err) {
		if(err) {
			return res.send('Error al guardar personaje')
		}
		res.redirect('/plataforma/personajes')
	})
})

//Delete Personaje
// Confirmar Delete
app.post('/delete/:id', function (req, res) {
	var id = req.params.id
	Personajes.findById({'_id': id}, function (err, personaje) {
		if(err) {
			return res.send('Error al buscar personaje: ' + err)
		}
		res.render('./plataforma/personajes/delete', {
			user: req.user,
			personaje: personaje
		})
	})
})

app.delete('/delete/:id', function (req, res) {
	var id = req.params.id
	Personajes.findById({'_id':id}, function (err, personaje) {
		if(err) {
			return res.send('Error al buscar personaje: ' + err)
		}

		if(req.body.name_confirmar == personaje.name) {
			Personajes.remove({'_id':id}, function (err) {
				if(err) {
					return res.send('Error al borrar personaje: ' + err)
				}
				res.redirect('/plataforma/personajes')
			})
		} else {
			res.render('./plataforma/personajes/delete',{
				user: req.user,
				personaje: personaje,
				msg: 'Los datos no coindicen, No Borrado!!'
			})
		}

	})
})

// Update personaje

app.post('/edit/:id', function (req, res) {
	var id = req.params.id
	Personajes.findById({'_id':id}, function (err, personaje) {
		if(err) {
			return res.send('Error al buscar personaje: ' + err)
		}
		res.render('./plataforma/personajes/update', {
			user: req.user,
			personaje: personaje
		})
	})
})

app.put('/edit/:id', function (req, res) {
	var id = req.params.id

	var data = {
		name: req.body.name,
		serie_anime: req.body.serie_anime,
		age: req.body.age,
		sexo: req.body.sexo
	}

	console.log(req.files)
	
	if(req.files.hasOwnProperty('cover')) {
		cloudinary.uploader.upload(req.files.cover.path, function (result) {
			data.cover = result.url

			Personajes.update({'_id':id}, data, function (err) {
				if(err) {
					return res.send('Error al encontrar dato: ' + err)
				}
				Personajes.findById({'_id':id}, function (err, personaje) {
					if(err) {
						return res.send('Error al buscar personaje: ' + err)
					}
					res.render('./plataforma/personajes/update', {
						user: req.user,
						personaje: personaje,
						msg: 'Se Actualizo Correctamente, Cover Cambiado'
					})
				})
			})
			
		},
		{ width: 800, height: 600, crop: "limit" })
	} else {

		Personajes.update({'_id':id}, data, function (err) {
			if(err) {
				return res.send('Error al encontrar dato: ' + err)
			}
			Personajes.findById({'_id':id}, function (err, personaje) {
				if(err) {
					return res.send('Error al buscar personaje: ' + err)
				}
				res.render('./plataforma/personajes/update', {
					user: req.user,
					personaje: personaje,
					msg: 'Se Actualizo Correctamente, Cover No Cambiado'
				})
			})
		})

	}
})

module.exports = app