var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
var passport = require('passport')
var multer = require("multer")
var cloudinary = require("cloudinary")

var path = require('path')
var logger = require('morgan')
var favicon = require('serve-favicon')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var session = require("express-session")

var config = require('./config')

//Connection Mongodb
mongoose.connect(config.mongodb.connect_local, function (err) {
	if(err) {
		return console.log('Error al connectar database: ' + err)
	}
	console.log('Exito base de datos connectada')
})

cloudinary.config({
	cloud_name: 'cromlu',
	api_key: '532668554832195',
	api_secret: 'PLstoVjJNoBiqPhNDGriHyVWVTc'
})

app.set('port', process.env.PORT || 5000)
app.set('view engine', 'jade')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './public')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(methodOverride('_method'))
app.use(favicon(path.join(__dirname, './public/images/favicon.ico')))
app.use(session({ secret: 'usuarioSession' }))
app.use(multer({dest: './uploads'}))

app.use(passport.initialize())
app.use(passport.session())

// Controllers 
var register = require('./controllers/passport_login')
var chat_normal = require('./controllers/plataforma_chat')
var chat_social = require('./controllers/plataforma_chat_social')
var personajes_crud = require('./controllers/plataforma_personajes')

register(passport)
chat_normal(io)
chat_social(io)
personajes_crud(io)

// Rotues requires
var login = require('./routes/login/index')
var plataforma = require('./routes/plataforma/index')
var plataforma_passport = require('./routes/plataforma/passport')
var chat_normal = require('./routes/plataforma/chat_normal/chat')
var chat_social = require('./routes/plataforma/chat_social/chat')
var personajes = require('./routes/plataforma/personajes/index')
var admin_login = require('./routes/admin/login/index')
var admin_panel = require('./routes/admin/panel/index')
var admin_users = require('./routes/admin/panel/users')
var admin_msgs = require('./routes/admin/panel/msgs') 


// routes
app.use('/', login)
app.use('/plataforma', plataforma)
app.use('/', plataforma_passport)
app.use('/plataforma/chat-normal', chat_normal)
app.use('/plataforma/chat-social', chat_social)
app.use('/plataforma/personajes', personajes)
app.use('/admin', admin_login)
app.use('/admin/panel', admin_panel)
app.use('/admin/panel/users', admin_users)
app.use('/admin/panel/msgs', admin_msgs)

// Error 404
app.use(function (req, res) {
	res.statusCode = 404
	res.send('Error 404, Page Not Found')
})

// Error 500
app.use(function (req, res) {
	res.statusCode = 500
	res.send('Error 500, Sistem Fail, Please Try Late')
})

http.listen(app.set('port'), function (err) {
	if(err) {
		return console.log('Error al lanzar server en el puerto: ' + err)
	}
	console.log('Server iniciado en el puerto: ' + app.set('port'))
})
