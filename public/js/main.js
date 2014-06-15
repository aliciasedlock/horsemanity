// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var currentAudio = null;
var introContext = new AudioContext();
var chorusContext = new AudioContext();
var chorusBuffer;
var introBuffer;

window.onload = function () {

	var introRequest = setUpRequest("assets/audio/IntroLoop.mp3");
	var chorusRequest = setUpRequest("assets/audio/ChorusLoop.mp3");

	introRequest.onload = function() {
		introContext.decodeAudioData(introRequest.response, function(buffer) {
			introBuffer = buffer;
		}, function () {
			console.log("ruh-roh, trouble gettin audio")
		});
	}
	
	chorusRequest.onload = function() {
		chorusContext.decodeAudioData(chorusRequest.response, function(buffer) {
			chorusBuffer = buffer;
		}, function () {
			console.log("ruh-roh, trouble gettin audio")
		});
	}

	introRequest.send();
	chorusRequest.send();

	window.setTimeout(function () {
		playAudio(introBuffer, introContext);
	}, 500)

	bindEvents();

	Game.load();
}

function bindEvents () {
	document.querySelector("#startGame").onclick = function () {
		stopAudio();
		playAudio(chorusBuffer, chorusContext);
		Game.start();
	}

	document.querySelector("#showInstructions").onclick = function () {
		document.querySelector(".menu").style.display = "none";
		document.querySelector(".credits").style.display = "none";
		document.querySelector(".instructions").style.display = "block";
	}

	document.querySelector("#quitHowTo").onclick = function () {
		document.querySelector(".instructions").style.display = "none";
		document.querySelector(".credits").style.display = "none";
		document.querySelector(".menu").style.display = "block";
	}

	document.querySelector("#playAgain").onclick = function () {
		Game.reset();
		Game.start();
	}

	document.querySelector("#mainMenu").onclick = function () {
		stopAudio();
		playAudio(introBuffer, introContext);
		Game.showScene("#startScene");
	}

	document.querySelector("#credits").onclick = function () {
		document.querySelector(".instructions").style.display = "none";
		document.querySelector(".menu").style.display = "none";
		document.querySelector(".credits").style.display = "block";
	}

	document.querySelector("#quitCredits").onclick = function () {
		document.querySelector(".instructions").style.display = "none";
		document.querySelector(".credits").style.display = "none";
		document.querySelector(".menu").style.display = "block";
	}
}

function setUpRequest (url, context, sourceBuffer) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	return request;
}

function playAudio (buffer, context) {
	currentAudio = context.createBufferSource();
	currentAudio.buffer = buffer;
	currentAudio.loop = true;
	currentAudio.connect(context.destination);
	currentAudio.start(0); 
}

function stopAudio () {
	currentAudio.stop();
	currentAudio = null;
}
