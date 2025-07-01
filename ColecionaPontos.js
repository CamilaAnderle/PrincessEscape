class ColecionaPontos {
    constructor(scene, plataformas, castle) {
      this.scene = scene;
      this.score = 0;
  
      // Texto de pontuação
      this.scoreText = scene.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#fff'
      });
  
      // Grupos de objetos
      this.moedas = scene.physics.add.group();

      this.moedas.create(100, 150, 'moeda');
      this.moedas.create(250, 10, 'moeda');
      this.moedas.create(500, 220, 'moeda');

      
      
      this.diamantes = scene.physics.add.group();
      this.diamantes.create(450, 10, 'diamante')
  
      this.bombas = scene.physics.add.group();
      this.bombas.create(40, 150, 'bomba')
      this.bombas.create(750, 150, 'bomba')
      this.bombas.create(650, 10, 'bomba')


     /* this.bombas = scene.physics.add.group({
        key: 'bomba',
        repeat: 1,
        setXY: { x: 200, y: 0, stepX: 200 }
      });*/
  
      // Efeitos físicos
      this.moedas.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
      });
      this.diamantes.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
      });
      this.bombas.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
      });
  
      // Colisões com plataformas
      scene.physics.add.collider(this.moedas, plataformas);
      scene.physics.add.collider(this.moedas, castle);
      scene.physics.add.collider(this.diamantes, castle);

      scene.physics.add.collider(this.diamantes, plataformas);
      scene.physics.add.collider(this.bombas, plataformas);
    }
  
    static preload(scene) {
      scene.load.image('moeda', 'assets/coinGold.png');
      scene.load.image('diamante', 'assets/gemBlue.png');
      scene.load.image('bomba', 'assets/bomb.png');
    }
  
    ativarColetas(player) {
      const sprite = player.sprite; // Usa o sprite da classe Player
  
      this.scene.physics.add.overlap(sprite, this.moedas, this.coletarMoeda, null, this);
      this.scene.physics.add.overlap(sprite, this.diamantes, this.coletarDiamante, null, this);
      this.scene.physics.add.overlap(sprite, this.bombas, this.tocarBomba, null, this);
    }
  
    coletarMoeda(player, moeda) {
      moeda.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    }
  
    coletarDiamante(player, diamante) {
      diamante.disableBody(true, true);
      this.score += 100;
      this.scoreText.setText('Score: ' + this.score);
    }
  
    tocarBomba(player, bomba) {
      bomba.disableBody(true, true);
      this.score -= 10;
      this.scoreText.setText('Score: ' + this.score);
  
      if (this.score < 0) {
        this.scene.scene.start('GameOver');
      }
    }
  }
  