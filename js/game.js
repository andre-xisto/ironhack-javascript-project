const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const snd = new Audio('./sounds/JackJohnson-PinaColadasSong.mp3'); // buffers automatically when created
const pop = new Audio('./sounds/pop.mp3');

function clearScreen() {
  context.clearRect(0, 0, canvasElement.width, canvasElement.height);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.player = new Basket(this);
    this.fruit = new Fruit(this);
    this.scoreboard = new Scoreboard(this);

    // Fruits
    this.firstFruit = new Fruit(this, 220, 30, 80, 130, randomNumber(4, 6), randomNumber(0, 11));
    this.secondFruit = new Fruit(this, 380, 30, 80, 130, randomNumber(4, 6), randomNumber(0, 11));
    this.thirdFruit = new Fruit(this, 540, 30, 80, 130, randomNumber(4, 6), randomNumber(0, 11));

    this.fruits = [];
    for (let i = 0; i < 1; i++) {
      //const fruit = this.fruit;
      this.fruits.push(this.firstFruit);
      this.fruits.push(this.secondFruit);
      this.fruits.push(this.thirdFruit);
      console.log(this.fruits);
    }

    this.setKeyBindings();
    this.running = true;
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.player.x - 90 > 0 ? (this.player.x -= 80) : '';
          this.player.x < 100 && this.player.score > 3
            ? (this.player.score -= 3)
            : this.player.x < 100
            ? (this.player.score = 0)
            : '';
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.player.x + this.player.width + 90 <= canvasElement.width
            ? (this.player.x += 80)
            : '';
          break;
        case ' ':
          event.preventDefault();
          this.restartGame();
          break;
      }
    });
  }

  runLogic() {
    this.player.runLogic();

    for (let fruit of this.fruits) {
      fruit.runLogic();

      const intersecting = fruit.checkIntersection(this.player);
      if (intersecting) {
        // Remove fruit from array of fruits
        const index = this.fruits.indexOf(fruit);
        this.fruits.splice(index, 1);
        // Increase player score
        if (fruit.image.src.includes('pinacolada')) {
          this.player.score = this.player.score + 1;
          this.player.score > this.player.highscore
            ? (this.player.highscore = this.player.score)
            : '';
          pop.play();
        } else {
          // GAME OVER
          this.loseGame();
        }
        console.log(this.player.score);
      }

      if (fruit.y > canvasElement.height) {
        const index = this.fruits.indexOf(fruit);
        this.fruits.splice(index, 3);
      }
    }

    if (this.fruits.length < 1) {

      const firstFruit = new Fruit(this, 220, 30, 80, 130, randomNumber(4, 6), randomNumber(0, 11));
      const secondFruit = new Fruit(
        this,
        380,
        30,
        80,
        130,
        randomNumber(4, 6),
        randomNumber(0, 11)
      );
      const thirdFruit = new Fruit(this, 540, 30, 80, 130, randomNumber(4, 6), randomNumber(0, 11));
      this.fruits.push(firstFruit, secondFruit, thirdFruit);
    }
    snd.play(); // ----> TURN THIS ON
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    for (let fruit of this.fruits) {
      fruit.paint();
    }
    this.scoreboard.paint();
  }

  loseGame() {
    // alert('Lost game');
    //loosingNoise.play();

    context.save();
    context.fillStyle = 'black';
    context.fillRect(0, 0, 500, 500);
    context.restore();

    this.running = false;
    if (this.loopId) {
      clearTimeout(this.loopId);
    }
  }

  restartGame() {
    this.player.score = 0;
    this.player.x = 80;
    this.loop();
    this.running = true;
  }

  loop() {
    // Run logic
    this.runLogic();

    // Erase
    this.clean();

    // Paint
    this.paint();

    if (this.running) {
      setTimeout(() => {
        this.loop();
      }, 1000 / 60);
    }
  }
}
