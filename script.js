
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#ccccff',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [Intro, Fase1, Fase2, FimJogo, Fim, GameOver],
};

const game = new Phaser.Game(config);
