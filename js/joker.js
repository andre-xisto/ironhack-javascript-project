// JOKER CLASS
class Joker {
  constructor(game, x, y, width, height, speed, imageIndex) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.imageIndex = imageIndex;

    this.jokerObject = [
      {
        url: '/images/joker-paraquedas.png',
        width: 744,
        height: 988,
        ratio: 0.8
      }
    ];

    // JOKER
    this.joker = new Image();
    this.jokerIndex = randomNumber(0, 0);
    this.joker.src = this.jokerObject[this.jokerIndex].url;
    this.src = this.joker.src;

    const jokerSize = 150 * this.jokerObject[this.jokerIndex].ratio;
    this.width = jokerSize;
    this.height = this.jokerObject[this.jokerIndex].height * (jokerSize / this.jokerObject[this.jokerIndex].width);
  }

  runLogic() {
    this.y += this.speed;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.joker, this.x, this.y, this.width, this.height);
    context.restore();
  }
}
