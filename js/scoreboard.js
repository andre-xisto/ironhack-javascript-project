class Scoreboard {
  constructor(game) {
    this.game = game;
  }

  paint() {
    const context = this.game.context;
    const highscore = this.game.player.highscore;
    const score = this.game.player.score;

    context.save();

    context.font = '32px sans-serif';

    context.fillText('HighScore: ' + highscore, 484, 50);
    context.fillText('Score: ' + score, 550, 90);

    context.restore();
  }
}
