var socket = io()

var $user_name = document.getElementById('user_name').getAttribute('value')
var $user_avatar = $('#user_avatar')[0].src

$('#form_chat').submit(function () {
	socket.emit('chat message social', {name: $user_name, msg: $('#message').val() , avatar: $user_avatar })
	$('#message').val('')
	return false
})

socket.on('chat message social', function (content) {
	$('#messages').prepend('<li class="msgs__item"> <div class="msgs__item__avatar"> <a class="avatar_event" value="' + content.name + '"> <img src="' + content.avatar + '" width="35"> </a> <strong>' + content.name + '</strong> </div> <div class="msgs__item__charla"> <p>' + content.msg + '</p> </div> </li>')
})


