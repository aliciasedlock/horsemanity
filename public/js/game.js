var Game = Game || {};

(function(game) {   

	game.playerOne = {
		character: "light-horse",
    	control: 50,
    	currentKey: null
	};

	game.playerTwo = {
		character: "shadow-horse",
    	control: 50,
    	currentKey: null
	};

	game.keys = [
		{
			key: "A",
			code: 65
		},
		{
			key: "B",
			code: 66
		},
		{
			key: "C",
			code: 67
		},
		{
			key: "D",
			code: 68
		},
		{
			key: "E",
			code: 69
		},
		{
			key: "F",
			code: 70
		},
		{
			key: "G",
			code: 71
		},
		{
			key: "H",
			code: 72
		},
		{
			key: "I",
			code: 73
		},
		{
			key: "J",
			code: 74
		},
		{
			key: "K",
			code: 75
		},
		{
			key: "L",
			code: 76
		},
		{
			key: "M",
			code: 77
		},
		{
			key: "N",
			code: 78
		},
		{
			key: "O",
			code: 79
		},
		{
			key: "P",
			code: 80
		},
		{
			key: "Q",
			code: 81
		},
		{
			key: "R",
			code: 82
		},
		{
			key: "S",
			code: 83
		},
		{
			key: "T",
			code: 84
		},
		{
			key: "U",
			code: 85
		},
		{
			key: "V",
			code: 86
		},
		{
			key: "W",
			code: 87
		},
		{
			key: "X",
			code: 88
		},
		{
			key: "Y",
			code: 89
		},
		{
			key: "Z",
			code: 90
		}
	];

	game.soundBuffer = null;
	game.soundContext = new AudioContext();

	game.showScene = function (sceneToShow) {

		document.querySelector("#mainScene").style.display = "none";
		document.querySelector("#endScene").style.display = "none";
		document.querySelector("#startScene").style.display = "none";

		document.querySelector(sceneToShow).style.display = "block";
	};

	game.load = function () {

		game.getVictorySound();
		game.showScene("#startScene");
	};

    game.start = function () {

    	game.playerOne.currentKey = game.resetKey();
		game.playerTwo.currentKey = game.resetKey();

    	game.updatePowerAllocation();
    	game.setLetterBubbles();

		document.body.onkeydown = function (event) {
			game.checkForMatch(event.keyCode);
		};

		game.showScene("#mainScene");
    };

    game.updatePowerAllocation = function () {

    	var powerOne = document.querySelector(".power.light-horse");
    	var powerTwo = document.querySelector(".power.dark-horse");

    	powerOne.style.width = game.playerOne.control + "%";
    	powerTwo.style.width = game.playerTwo.control + "%";
    };

    game.getRandomKey = function () {

    	var index = Math.floor(Math.random() * (game.keys.length));

    	return game.keys[index];
    };

    game.checkForMatch = function (keyCode) {

    	if (game.playerOne.control < 100 && game.playerTwo.control < 100) {
    		if (game.playerOne.currentKey.code === keyCode) {
	    		game.playerOne.control += 5;
	    		game.playerTwo.control -= 5;
	    		game.playerOne.currentKey = game.resetKey();

	    		if (game.playerOne.control === 100) {
	    			game.gameOver(game.playerOne);
	    		}
	    	}

	    	if (game.playerTwo.currentKey.code === keyCode) {
	    		game.playerTwo.control += 5;
	    		game.playerOne.control -= 5;
	    		game.playerTwo.currentKey = game.resetKey();

	    		if (game.playerTwo.control === 100) {
	    			game.gameOver(game.playerTwo);
	    		}
	    	}

	    	game.updatePowerAllocation();
	    	game.setLetterBubbles();
    	}
    };

    game.resetKey = function () {
    	var randomKey = game.getRandomKey();

    	do {
    		randomKey = game.getRandomKey();
    	} while (game.playerOne.currentKey === randomKey || game.playerTwo.currentKey === randomKey)

		return randomKey;
    };

    game.setLetterBubbles = function () {

    	document.querySelector(".player.light-horse .letter-bubble").innerHTML = game.playerOne.currentKey.key;
    	document.querySelector(".player.dark-horse .letter-bubble").innerHTML = game.playerTwo.currentKey.key;
    };

    game.gameOver = function (winner) {

    	game.playVictorySound();

    	var winner = winner.character.split("-").join(" ");
    	document.querySelector("#endScene h1").innerHTML = winner + " has won";

    	window.setTimeout(function () {
    		game.showScene("#endScene");
    	}, 2000);
    };

    game.getVictorySound = function () {

    	var request = new XMLHttpRequest();
		request.open('GET', "assets/audio/WinnerBell.mp3", true);
		request.responseType = 'arraybuffer';

		request.onload = function() {
			game.soundContext.decodeAudioData(request.response, function(buffer) {
				game.soundBuffer = buffer;
			}, function () {
				console.log("ruh-roh, trouble gettin audio")
			});
		}

		request.send();
    }

    game.playVictorySound = function () {
    	var bell = game.soundContext.createBufferSource();
		bell.buffer = game.soundBuffer;
		bell.connect(game.soundContext.destination);
		bell.start(0); 
    };

    game.reset = function () {
    	game.playerOne = {
			character: "light-horse",
	    	control: 50,
	    	currentKey: null
		};

		game.playerTwo = {
			character: "shadow-horse",
	    	control: 50,
	    	currentKey: null
		};
    };

})(Game);

