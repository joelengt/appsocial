var $btn_menu__open = document.querySelector('#btn__menu__open')
var $btn_menu__close = document.querySelector('#btn__menu__close')
var $barra_menu = document.querySelector('.user__menu')

$btn_menu__open.addEventListener('click', function () {
	$barra_menu.style.display= 'block'
	$btn_menu__open.style.display= 'none'
	$btn_menu__close.style.display= 'inline-block'

	return false
})

$btn_menu__close.addEventListener('click', function () {
	$barra_menu.style.display= 'none'
	$btn_menu__open.style.display= 'inline-block'
	$btn_menu__close.style.display= 'none'

	return false
})