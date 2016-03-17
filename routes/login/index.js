var express =  require('express')
var app = express.Router()

app.get('/login', function (req, res) {
	res.render('./login/login_form')
})

app.get('/login-social', function (req, res) {
	res.render('./login/login_social_form')
})

module.exports = app