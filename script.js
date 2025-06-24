
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
  scene: [Fase1, Fase2, GameOver],
};

const game = new Phaser.Game(config);
