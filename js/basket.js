class Basket {
  constructor(game) {
    this.game = game;

    this.x = 80;
    this.y = 550;
    this.score = 0;
    this.highscore = 0;

    this.width = 100;
    this.height = 120;

    this.image = new Image();
    this.image.src = './images/basket.png';
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    // context.fillStyle = 'steelblue';
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.save();
    context.drawImage(this.image, this.x - 30, this.y - 100, this.width, this.height);
    context.restore();
  }
}

// const player = new Basket(260, 700, 0);

/*
window.addEventListener('keydown', event => {
  //event.preventDefault();
  const key = event.key;
  switch (key) {
    case 'ArrowLeft':
      player.x - 90 > 0 ? (player.x -= 30) : '';
      break;
    case 'ArrowRight':
      player.x + player.width + 90 <= canvasElement.width ? (player.x += 30) : '';
      break;
  }
});
*/
