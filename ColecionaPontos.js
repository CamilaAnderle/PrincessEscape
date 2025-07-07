class ColecionaPontos {
  constructor(scene, plataformas, castle) {
    this.scene = scene;
    this.score = 0;

    // Texto de pontuação
    this.scoreText = scene.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      fill: '#fff'
    });

    this.temChave = false;

    // Grupos de objetos
    this.moedas = scene.physics.add.group();
    this.moedas.create(100, 150, 'moeda');
    this.moedas.create(250, 10, 'moeda');
    this.moedas.create(500, 220, 'moeda');

    this.diamantes = scene.physics.add.group();
    this.diamantes.create(450, 10, 'diamante');

    this.bombas = scene.physics.add.group();
    this.bombas.create(40, 150, 'bomba');
    this.bombas.create(670, 10, 'bomba');

    this.bombas.children.iterate(bomba => {
      bomba.setScale(0.7);
      bomba.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    });

    this.moedas.children.iterate(moeda => {
      moeda.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    });

    this.diamantes.children.iterate(diamante => {
      diamante.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    });

    // Colisões com plataformas
    scene.physics.add.collider(this.moedas, plataformas);
    scene.physics.add.collider(this.moedas, castle);
    scene.physics.add.collider(this.diamantes, plataformas);
    scene.physics.add.collider(this.diamantes, castle);
    scene.physics.add.collider(this.bombas, plataformas);

    // Chave já visível no mapa
    this.chave = this.scene.physics.add.sprite(750, 350, 'chave').setVisible(true);
    // Animação de flutuação da chave (sobe e desce suavemente)
    scene.tweens.add({
      targets: this.chave,
      y: this.chave.y - 10, // sobe 10 pixels
      duration: 1000,       // em 1 segundo
      yoyo: true,           // volta à posição original
      repeat: -1,           // repete para sempre
      ease: 'Sine.easeInOut'
    });

    scene.physics.add.collider(this.chave, plataformas);

    // HUD da chave (só visível quando coletada)
    this.chaveHud = this.scene.add.image(220, 32, 'chave')
      .setVisible(false)
      .setScrollFactor(0)
      .setScale(0.5);
  }

  static preload(scene) {
    scene.load.image('moeda', 'assets/coinGold.png');
    scene.load.image('diamante', 'assets/gemBlue.png');
    scene.load.image('bomba', 'assets/bomb.png');
    scene.load.image('chave', 'assets/keyYellow.png');
  }

  ativarColetas(player) {
    const sprite = player.sprite;

    this.scene.physics.add.overlap(sprite, this.moedas, this.coletarMoeda, null, this);
    this.scene.physics.add.overlap(sprite, this.diamantes, this.coletarDiamante, null, this);
    this.scene.physics.add.overlap(sprite, this.bombas, this.tocarBomba, null, this);
    this.scene.physics.add.overlap(sprite, this.chave, this.coletarChave, null, this);
  }

  coletarChave(player, chave) {
    chave.disableBody(true, true);
    this.chaveHud.setVisible(true);
    this.temChave = true;
  }

  coletarMoeda(player, moeda) {
    moeda.disableBody(true, true);
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
  }

  coletarDiamante(player, diamante) {
    diamante.disableBody(true, true);
    this.score += 50;
    this.scoreText.setText('Score: ' + this.score);
  }

  tocarBomba(player, bomba) {
    bomba.disableBody(true, true);
    this.score -= 15;
    this.scoreText.setText('Score: ' + this.score);

    if (this.score < 0) {
      this.scene.scene.start('GameOver');
    }
  }
}
