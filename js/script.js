document.getElementById('see-rules').onclick = function () {
  document.querySelector('.game-intro').classList.add('none');
  document.getElementById('rules').classList.remove('none');
};

document.getElementById('start-game').onclick = function () {
  document.getElementById('rules').classList.add('none');
  document.getElementById('canvas-game').classList.remove('none');
};

window.addEventListener('load', () => {
  const canvasElement = document.getElementById('game');
  const game = new Game(canvasElement);

  game.setKeyBindings();

  game.loop();
});
