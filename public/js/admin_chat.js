var socket = io()

socket.on('chat message social', function (content) {
	$('#messages').prepend('<li><div class="Mensajes__top"><span class="Mensajes__top--user"><img src="' + content.avatar + '" width="20"><strong></strong>' + content.name + '</span><span class="Mensajes__top--close"><form action="/admin/panel/msgs/delete/' + content.id + '?_method=delete", method="post"><button>X</button></form></span></div><div class="Mensajes__bottom"><p>' + content.msg + '</p></div></li>')
})

