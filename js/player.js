class Basket {
  constructor(game) {
    this.game = game;

    this.x = 80;
    this.y = 577;
    this.score = 0;
    this.highscore = 0;
    this.lostKittens = 0;
    this.joker = 0;

    this.width = 140;
    this.height = 100;

    this.image = new Image();
    this.image.src = './images/alcofa.png';
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

  checkIntersection(image) {
    return image.x + image.width > this.x && image.x < this.x + this.width && image.y + image.height > this.y - 30 && image.y + 100 < this.y + this.height;
  }
}
