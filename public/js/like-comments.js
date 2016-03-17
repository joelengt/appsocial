var $btn_likes_off = document.querySelectorAll('.icon-heart-off')
var $btn_likes_on = document.querySelectorAll('.icon-heart-on')


for (var i = $btn_likes_off.length - 1; i >= 0; i--) {
	var el = $btn_likes_off[i]
	el.addEventListener('click', HeartOn)
}

for (var i = $btn_likes_on.length - 1; i >= 0; i--) {
	var el = $btn_likes_on[i]
	el.addEventListener('click', HeartOff)
}

function HeartOn() {
	defaultPrevented()
	this.parentNode.classList.remove('icon-heart-off')
	this.parentNode.classList.add('icon-heart-on')
}

function HeartOff() {
	defaultPrevented()
	this.parentNode.classList.add('icon-heart-off')
	this.parentNode.classList.remove('icon-heart-on')
}