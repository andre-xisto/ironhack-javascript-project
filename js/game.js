const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const snd = new Audio('./sounds/JackJohnson-PinaColadasSong.mp3'); // buffers automatically when created
const pop = new Audio('./sounds/pop.mp3');
const miau = new Audio('./sounds/miau.mp3');
miau.volume = 0.2;
const xplode = new Audio('./sounds/explosion.mp3');
xplode.volume = 0.4;

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.player = new Basket(this);
    this.explosion = new Explosion(this);
    this.scoreboard = new Scoreboard(this);

    // First Cats of the Loop
    this.columns = [220, 380, 540];
    this.row = [];

    this.setKeyBindings();
    this.running = true;
    this.bomb = false;
    this.lostKitten = false;
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          this.player.x - 90 > 0 ? (this.player.x -= 80) : '';
          this.player.x < 100 && this.player.score > 3 ? (this.player.score -= 3) : this.player.x < 100 ? (this.player.score = 0) : '';
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.player.x + this.player.width + 90 <= canvasElement.width ? (this.player.x += 80) : '';
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

    // Speed increase // INCREASES WITH PLAYER SCORE
    const speed = (1 + this.player.score) / 4;

    // Add images to the array
    if (this.row.length < 1) {
      // Add CATS and BOMBS : 10
      for (let i = 0; i <= 10; i++) {
        this.row.push(new Cat(this, this.columns[randomNumber(0, 2)], 30, 80, 130, randomNumber(4, 6) + speed, randomNumber(0, 4)));
        this.row.push(new Bomb(this, this.columns[randomNumber(0, 2)], 30, 80, 130, randomNumber(4, 6) + speed, randomNumber(0, 2)));
      }
      // Add Parachute : 1
      this.row.push(new Joker(this, this.columns[randomNumber(0, 2)], 30, 80, 130, randomNumber(4, 6) + speed, 0));
    }

    // Remove extra images added
    shuffle(this.row);
    this.row.splice(3, this.row.length - 3);

    // Check for images on the same column
    for (let i = 0; i < this.row.length - 1; i++) {
      if (this.row[i].x === this.row[i + 1].x) {
        this.row.splice(i, 1);
      }
    }

    // Run Logic
    for (let image of this.row) {
      image.runLogic();

      // Colision detection
      const intersecting = this.player.checkIntersection(image);
      if (intersecting) {
        const index = this.row.indexOf(image);
        // Player catches a kitten
        if (image.src.includes('cat')) {
          this.player.score++;
          this.player.score > this.player.highscore ? (this.player.highscore = this.player.score) : '';
          pop.play();
          // Remove cat from array of row
          this.row.splice(index, 1);
        } else if (image.src.includes('joker')) {
          this.player.joker++;
          // Remove joker from array of row
          this.row.splice(index, 1);
        }
        // GAME OVER - Hits a BOMB
        else {
          xplode.play();
          this.row.splice(index, 1);
          this.row.push(new Explosion(this, this.player.x - 50, this.player.y - 150, 500, 190, speed, 0));
          this.bomb = true;
          this.loseGame();
        }
      }
      console.log(this.player.score);

      // Images dropping canvas
      if (image.y > canvasElement.height) {
        if (image.src.includes('cat')) {
          this.player.lostKittens++;
          if (this.player.joker > 0) {
            this.player.joker--;
          } else {
            // GAMEOVER - LOSES a CAT
            this.loseGame();
            this.lostKitten = true;
          }
          const index = this.row.indexOf(image);
          this.row.splice(index, 1);
          miau.play();
        } else {
          const index = this.row.indexOf(image);
          this.row.splice(index, 1);
        }
      }

      // snd.play(); // ----> TURN THIS ON
    }

    if (this.player.score >= 15) {
      this.levelUp();
    }
  }

  levelUp() {
    canvasElement.classList.add('canvas-lvl-up');
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    for (let image of this.row) {
      image.paint();
    }
    this.scoreboard.paint();

    // Hit a BOMB
    if (!this.running && this.bomb === true && this.lostKitten === false) {
      context.save();
      context.font = '80px Righteous';
      context.fillStyle = 'firebrick';
      context.fillText('BAMMM!', 230, 300, 300, 200);
      context.fillStyle = '#fff';
      context.font = '40px Righteous';
      context.fillText('Hit the SPACE BAR to save more kittens', 130, 350, 500, 200);
      context.restore();
    }
    if (!this.running && this.lostKitten === true) {
      context.save();
      context.font = '80px Righteous';
      context.fillStyle = 'firebrick';
      context.fillText('OH NOESSS', 230, 300, 300, 200);
      context.fillStyle = '#fff';
      context.font = '40px Righteous';
      context.fillText('Hit the SPACE BAR to save more kittens', 130, 350, 500, 200);
      context.restore();
    }
  }

  loseGame() {
    // alert('Lost game');
    //loosingNoise.play();

    this.running = false;
  }

  restartGame() {
    this.row = [];
    this.player.score = 0;
    this.player.lostKittens = 0;
    this.player.joker = 0;
    this.player.x = 80;
    this.loop();
    canvasElement.classList.remove('canvas-lvl-up');
    this.lostKitten = false;
    this.bomb = false;
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
