var socket = io()

// Data author
var $user_name = document.getElementById('user_name').getAttribute('value')
var $user_avatar = $('#user_avatar')[0].src

var author = {
	name: $user_name,
	avatar: $user_avatar
}

$('#Formulario_create').submit(function () {
	socket.emit('new personaje', {
		personaje: {
			id: '',
			name: $('#personaje_name').val(),
			serie_anime: $('#personaje_name_serie_anime').val(),
			age: $('#personaje_age').val(),
			sexo: $('#personaje_sexo').val(),
			cover: $('#personaje_cover').val()
		},
		author: author
	})

	$('#personaje_name').val('')
	$('#personaje_name_serie_anime').val('')
    $('#personaje_age').val('')
    $('#personaje_sexo').val('')
    $('#personaje_cover').val('')
	return false
})

socket.on('new personaje', function (content) {
	$('#pj_item').prepend('<article class="Personajes-app__read__item"><div class="item__title"><h2>' + content.personaje.name + '</h2></div><figure class="item__imagen"><img src="' + content.personaje.cover + '"></figure><div class="item__data"><div class="item__data--rate"><p class="rate__right"><span class="icon-heart-on"></span><span id="like-cant">7</span><p>Likes</p></p><p class="rate__left"><span class="icon-bubbles2"></span><span id="comment-cant">23</span><p>Comentarios</p></p></div><div class="item__data--author"><strong> By:</strong><figure><img src="' + content.author.avatar + '" width="20"></figure><p>' + content.author.name + '</p></div></div><div class="item__detalles">  <span><strong>Serie/Grupo:</strong><p> ' + content.personaje.serie_anime + '</p></span><span><strong>Sexo:</strong><p> ' + content.personaje.sexo + '</p></span>  </div><div class="item__action"><div class="action--like"><a href="" class="icon-heart-off  color-gray"></a></div><div class="action--comment"><input type="text" placeholder="Añade un Comentario..."></div><div class="action--settings"><a href="/plataforma/personajes/detalles/' + content.personaje.id + '" class="icon-settings"></a></div></div></article>')
})

