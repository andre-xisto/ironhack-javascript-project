// Fruit class
class Cat {
  constructor(game, x, y, width, height, speed, imageIndex) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.imageIndex = imageIndex;

    this.imageObject = [
      {
        url: '/images/cat1.png',
        width: 497,
        height: 373,
        ratio: 1.2
      },
      {
        url: '/images/cat2.png',
        width: 203,
        height: 252,
        ratio: 0.7
      },
      {
        url: '/images/cat4.png',
        width: 632,
        height: 605,
        ratio: 0.9
      },
      {
        url: '/images/cat5.png',
        width: 472,
        height: 327,
        ratio: 1
      },
      {
        url: '/images/cat6.png',
        width: 669,
        height: 470,
        ratio: 1
      },
      {
        url: '/images/explosives.png',
        width: 276,
        height: 599,
        ratio: 0.5
      },
      {
        url: '/images/bomb.png',
        width: 1668,
        height: 1686,
        ratio: 0.8
      },
      {
        url: '/images/safe-breadnbutter.png',
        width: 551,
        height: 512,
        ratio: 0.7
      },
      {
        url: '/images/bigorna.png',
        width: 605,
        height: 413,
        ratio: 0.9
      }
    ];

    this.image = new Image();
    this.imageIndex = randomNumber(0, 8);
    this.image.src = this.imageObject[this.imageIndex].url;

    /*this.width = 
      this.imageObject[this.imageIndex].width * (160 / this.imageObject[this.imageIndex].height);
    this.height = 150;*/

    const size = 150 * this.imageObject[this.imageIndex].ratio;
    this.width = size;
    this.height = this.imageObject[this.imageIndex].height * (size / this.imageObject[this.imageIndex].width);
  }

  runLogic() {
    this.y += this.speed;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.restore();
    /*
    context.fillStyle = 'coral';
    context.fillRect(this.x, this.y, this.width, this.height);
    */
  }

  checkIntersection(player) {
    return player.x + player.width > this.x && player.x < this.x + this.width && player.y + player.height - 100 > this.y && player.y - 60 < this.y + this.height;
  }
}
