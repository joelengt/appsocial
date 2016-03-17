var express = require('express')
var passport = require('passport')
var app = express.Router()

// passport config
app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/login-social')
})

app.get('/auth/twitter', passport.authenticate('twitter'))
app.get('/auth/facebook', passport.authenticate('facebook'))

app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/plataforma', failureRedirect: '/login-social'}
))

app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/plataforma', failureRedirect: '/login-social'}
))

module.exports = app