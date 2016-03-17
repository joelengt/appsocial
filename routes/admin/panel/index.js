var express = require('express')
var app = express.Router()
var config = require('../../../config')

var admin = {
	name: config.admin.name,
	pass: config.admin.pass
}

// Peticion de acceso al panel
app.post('/', function (req, res) {
	if(req.body.nombre == admin.name && req.body.clave == admin.pass) {
		res.render('./admin/panel/index' , {
			admin: admin
		})
	} else {
		res.render('./admin/login/index', {
			msg: 'Los datos no coinciden, Intente nuevamente!'
		})
	}
})

module.exports = app