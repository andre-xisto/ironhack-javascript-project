// CATS CLASS
class Cat {
  constructor(game, x, y, width, height, speed, imageIndex) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.imageIndex = imageIndex;

    this.catObject = [
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
      }
    ];

    // CATS
    this.cat = new Image();
    this.catIndex = randomNumber(0, 4);
    this.cat.src = this.catObject[this.catIndex].url;
    this.src = this.cat.src;

    const catSize = 150 * this.catObject[this.catIndex].ratio;
    this.width = catSize;
    this.height = this.catObject[this.catIndex].height * (catSize / this.catObject[this.catIndex].width);
  }

  runLogic() {
    this.y += this.speed;
  }

  paint() {
    const context = this.game.context;
    context.save();
    context.drawImage(this.cat, this.x, this.y, this.width, this.height);
    context.restore();
    /*
    context.fillStyle = 'coral';
    context.fillRect(this.x, this.y, this.width, this.height);
    */
  }
}
