const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const snd = new Audio('./sounds/JackJohnson-PinaColadasSong.mp3'); // buffers automatically when created
const pop = new Audio('./sounds/pop.mp3');
const miau = new Audio('./sounds/miau.mp3');
miau.volume = 0.2;

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
    this.cat = new Cat(this);
    this.scoreboard = new Scoreboard(this);

    // First Cats of the Loop
    this.columns = [220, 380, 540];
    this.cats = [];

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
    
    this.cats.length === 3 && (this.cats[0].imageIndex === this.cats[1].imageIndex) === this.cats[2].imageIndex ? (this.player.score += 30) : '';
    
    // Speed increase
    const speed = randomNumber(4, 6) + (1 + this.player.score)/4;

    // Add kittens to the array
    if (this.cats.length < 1) {
        this.cats.push(new Cat(this, 220, 30, 80, 130, speed, randomNumber(0, 11)));
        this.cats.push(new Cat(this, 380, 30, 80, 130, speed, randomNumber(0, 11)));
        this.cats.push(new Cat(this, 540, 30, 80, 130, speed, randomNumber(0, 11)));
    }
    
    for (let cat of this.cats) {
      cat.runLogic();

      // Player catches a kitten
      const intersecting = cat.checkIntersection(this.player);
      if (intersecting) {
        const index = this.cats.indexOf(cat);
        // Increase player score        
        if (cat.image.src.includes('cat')) {
          this.player.score++;
          this.player.score > this.player.highscore ? (this.player.highscore = this.player.score) : '';
          pop.play();
          // Remove cat from array of cats
          this.cats.splice(index, 1);
        } 
        else if (cat.image.src.includes('butter')) {
          this.player.joker++;
          // Remove butter from array of cats
          this.cats.splice(index, 1);
        }        
        else {
          // GAME OVER
          this.loseGame();
        }
        console.log(this.player.score);
      }

      // Kittens dropping canvas
      if (cat.y > canvasElement.height) {
        if (cat.image.src.includes('cat')) {
          this.player.lostKittens++;
          this.player.joker > 0 ? this.player.joker-- : this.loseGame();
          const index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
          miau.play();
        } else {
          const index = this.cats.indexOf(cat);
          this.cats.splice(index, 1);
        }
      }
    }


    // Remove kittens on the same column
    for (let i = 0; i < this.cats.length; i++) {
      if (this.cats[i].x === this.cats[this.cats.length - 1]) {
        this.cats.splice(i, 1);
      }
    }

    

    /*
    if (this.cats[0].x === this.cats[1].x || this.cats[0].x === this.cats[2].x) {
      console.log('Intersection nabbb');
    }
    */
    // SPECIAL BONUS: 3 of a kind
    //console.log(this.fruits[0].imageIndex === this.fruits[1].imageIndex  === this.fruits[2].imageIndex)
    // console.log(this.fruits.length === 3 && this.fruits[0].imageIndex === this.fruits[1].imageIndex  === this.fruits[2].imageIndex)

    // snd.play(); // ----> TURN THIS ON
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.player.paint();
    for (let cat of this.cats) {
      cat.paint();
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
    this.player.lostKittens = 0;
    this.player.joker = 0;
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
