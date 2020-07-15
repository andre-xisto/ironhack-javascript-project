// Fruit class
class Fruit {
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
        url: '/images/agua-luso.png',
        width: 215,
        height: 658
      },
      {
        url: '/images/beer.png',
        width: 477,
        height: 1443
      },
      {
        url: '/images/coca-cola.png',
        width: 201,
        height: 622
      },
      {
        url: '/images/corona.png',
        width: 117,
        height: 416
      },
      {
        url: '/images/milk.png',
        width: 732,
        height: 1505
      },
      {
        url: '/images/pinacolada-ananas.png',
        width: 477,
        height: 942
      },
      {
        url: '/images/pinacolada-ice.png',
        width: 500,
        height: 676
      },
      {
        url: '/images/pinacolada-rum1.png',
        width: 752,
        height: 2240
      },
      {
        url: '/images/pinacolada-rum2.png',
        width: 303,
        height: 1000
      },
      {
        url: '/images/vodka.png',
        width: 627,
        height: 1517
      },
      {
        url: '/images/whisky.png',
        width: 199,
        height: 596
      }
    ];

    this.image = new Image();
    this.imageIndex = randomNumber(0, 10);
    this.image.src = this.imageObject[this.imageIndex].url;

    this.width =
      this.imageObject[this.imageIndex].width * (160 / this.imageObject[this.imageIndex].height);
    this.height = 150;
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
    return (
      player.x + player.width > this.x &&
      player.x < this.x + this.width &&
      player.y + player.height > this.y &&
      player.y - 50 < this.y + this.height
    );
  }
}
