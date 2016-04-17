$(document).ready(function() {
	flashingEyes();
	getWouldbeRandomPost();
});

function flashingEyes() {
	var $div = $('#flashingEyes');

	function changeBgColor() {
		var hue;
		var hueValues = [];

		for (var i = 1; i <= 3; i++) {
			hueValues.push(Math.floor(Math.random() * 127) + 127);
		}

		hue = 'rgb(' + hueValues.join(',') + ')';

		$div.css('background-color', hue);
	}

	changeBgColor();

	setInterval(function() {
		changeBgColor();
	}, 900);
}

function msgTypeAnimation() {
	var $msg = $('#msgWrap .msg');
	var msgText = $msg.data('text');
	var msgTextChars = msgText.split('');
	var typeTimer = setInterval(type, 70);

	function type() {
		if (msgTextChars.length > 0) {
			$msg.text(function(k, v) {
				return v + msgTextChars.shift();
			});
		} else {
			clearTimeout(typeTimer);
			return false;
		}
	}
}

function getWouldbeRandomPost() {
	var posts = [];

	$.get('http://api.vk.com/method/wall.search?owner_id=-118956942&query=Вот+бы', function(res) {
		if (res.response.length > 1) {
			$.each(res.response, function(k, v) {
				if (k == 0) {
					return;
				}

				posts.push(v.text);
			});

			var randomPost = posts[Math.floor(Math.random() * posts.length)];

			if (typeof randomPost == 'undefined') {
				randomPost = 'Woulbe has you...';
			}

			$('#msgWrap .msg').data('text', randomPost);

			msgTypeAnimation();
		}
	}, 'jsonp');
}

