class GameOver extends Phaser.Scene {
    constructor() {
      super('GameOver');
    }
  
    preload() {
      this.load.image('gameOverBG', 'assets/gameOver.png');
    }
  
    create() {
      window.scoreGlobal = 0;
      this.add.image(0, 0, 'gameOverBG').setOrigin(0, 0).setDisplaySize(800, 600);
  
      this.input.once('pointerdown', () => {
        this.scene.start('Fase1');
      });
    }
  }
  