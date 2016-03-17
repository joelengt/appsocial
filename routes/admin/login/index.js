var express = require('express')
var app = express.Router()

app.get('/login', function (req, res) {
	res.render('./admin/login/index')
})

module.exports = app