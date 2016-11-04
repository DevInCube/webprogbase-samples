console.log('p2p');

var con = document.getElementById('console');
function console_log(data) {
	con.textContent += data + '\n';
}

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
	.then(function(stream) {

		var Peer = require('simple-peer');
		var peer = new Peer({
			initiator: location.hash === '#init',
			trickle: false,
			stream: stream
		});
		
		if (location.hash === '#init') {
			console_log('initiator');
		} else {
			console_log("not an initiator");
		}
		
		var myvideo = document.getElementById('myvideo');
		myvideo.src = window.URL.createObjectURL(stream);
		myvideo.play();
		
		peer.on('error', function (err) { console.log(err) });
		
		peer.on('signal', function (data) {
			console_log('signal');
			document.getElementById('yourId').value = JSON.stringify(data);
		});
		
		peer.on('connect', function () {
			console_log('CONNECT');
		})

		peer.on('data',function(data) {
			document.getElementById('messages').textContent += '[Peer]:' + data + '\n';
		});
		

		document.getElementById('connect').addEventListener('click', function() {
			var otherId = JSON.parse(document.getElementById('otherId').value);
			peer.signal(otherId);
		});

		document.getElementById('send').addEventListener('click', function() {
			var yourMessage = document.getElementById('yourMessage').value;
			peer.send(yourMessage);
			document.getElementById('messages').textContent += '[You]:' + yourMessage + '\n';
		});
		
		peer.on('stream', function (stream2) {
			var video = document.getElementById('stream');
			video.src = window.URL.createObjectURL(stream2);
			video.play();
		});
	})
	.catch(function (err) {
		console_log(err);
	});