// BOMBS CLASS
class Bomb {
  constructor(game, x, y, width, height, speed, imageIndex) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.imageIndex = imageIndex;

    this.bombObject = [
      {
        url: '/images/bomb-explosives.png',
        width: 276,
        height: 599,
        ratio: 0.4
      },
      {
        url: '/images/bomb-bomb.png',
        width: 1668,
        height: 1686,
        ratio: 0.8
      },
      {
        url: '/images/bomb-bigorna.png',
        width: 605,
        height: 413,
        ratio: 0.9
      }
    ];

    // BOMBS
    this.bomb = new Image();
    this.bombIndex = randomNumber(0, 2);
    this.bomb.src = this.bombObject[this.bombIndex].url;
    this.src = this.bomb.src;

    const bombSize = 150 * this.bombObject[this.bombIndex].ratio;
    this.width = bombSize;
    this.height = this.bombObject[this.bombIndex].height * (bombSize / this.bombObject[this.bombIndex].width);
  }

  runLogic() {
    this.y += this.speed;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.bomb, this.x, this.y, this.width, this.height);
    context.restore();
  }
}

// EXPLOSION CLASS

class Explosion {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.explosionObject = [
      {
        url: '/images/explosion.png',
        width: 3262,
        height: 3091,
        ratio: 1
      }
    ];

    this.explosion = new Image();
    this.explosionIndex = 0;
    this.explosion.src = this.explosionObject[this.explosionIndex].url;
    this.src = this.explosion.src;
    // this.src = this.explosion.explosionObject[0].url;

    const explosionSize = 190 * this.explosionObject[this.explosionIndex].ratio;
    this.width = explosionSize;
    this.height = this.explosionObject[this.explosionIndex].height * (explosionSize / this.explosionObject[this.explosionIndex].width);
  }

  runLogic() {}

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.explosion, this.x, this.y, this.width, this.height);
    context.restore();
  }
}
