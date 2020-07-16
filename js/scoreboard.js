class Scoreboard {
  constructor(game) {
    this.game = game;
  }

  paint() {
    const context = this.game.context;
    const highscore = this.game.player.highscore;
    const score = this.game.player.score;
    const lostKittens = this.game.player.lostKittens;
    const joker = this.game.player.joker;

    context.save();

    context.font = '32px sans-serif';

    context.fillText('Score: ' + score, 550, 50);
    context.fillText('HighScore: ' + highscore, 484, 90);

    context.fillText('Lost Kittens: ' + lostKittens, 30, 50);
    context.fillText('Parachutes: ' + joker, 30, 90);

    context.restore();
  }
}
