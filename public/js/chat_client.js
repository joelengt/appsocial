var socket = io()

var colors = ['red', 'blue', 'orange', 'salmon','green','olive','peru']

var max = colors.length - 1
var min = 0

var Position_Color = Math.round((Math.random()* (max - min)) + min)

document.querySelector('.title').style.color = colors[Position_Color]

$('#form_chat').submit(function () {
	socket.emit('chat message', {user: $('#user_name').val(), msg: $('#message').val(), colorName: colors[Position_Color] })
	$('#message').val('')
	return false
})

socket.on('chat message', function (content) {
	$('#messages').prepend('<li><strong style="color:' + content.colorName + ';">' + content.user + ':</strong> ' + content.msg + '</li>')
})