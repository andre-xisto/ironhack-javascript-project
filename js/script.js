window.addEventListener('load', () => {
  const canvasElement = document.getElementById('game');
  const game = new Game(canvasElement);

  document.getElementById('see-rules').onclick = function () {
    document.querySelector('.game-intro').classList.add('none');
    document.getElementById('rules').classList.remove('none');
  };

  document.getElementById('see-rules-canvas').onclick = function () {
    document.getElementById('canvas-game').classList.add('none');
    document.getElementById('rules').classList.remove('none');
  }
  
  document.getElementById('start-game').onclick = function () {
    document.getElementById('rules').classList.add('none');
    document.getElementById('canvas-game').classList.remove('none');
    game.loop();
  };

  game.setKeyBindings();
});

function clearScreen() {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
