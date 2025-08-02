class ColecionaPontos {
  constructor(scene, plataformas, castle, fase = 'Fase1') {
    this.scene = scene;

    if (window.scoreGlobal === undefined) {
      window.scoreGlobal = 0;
    }

    this.score = window.scoreGlobal;

    this.scoreText = scene.add.text(16, 16, 'Score: ' + this.score, {
      fontSize: '32px',
      fill: '#fff'
    });

    this.temChave = false;

    this.moedas = scene.physics.add.group();
    this.diamantes = scene.physics.add.group();
    this.bombas = scene.physics.add.group();

    if (fase === 'Fase1') {
      this.moedas.create(100, 150, 'moeda');
      this.moedas.create(250, 10, 'moeda');
      this.moedas.create(500, 220, 'moeda');

      this.diamantes.create(450, 10, 'diamante');

      this.bombas.create(40, 150, 'bomba');
      this.bombas.create(670, 10, 'bomba');

      this.chave = scene.physics.add.sprite(750, 350, 'chave').setVisible(true);
    } else if (fase === 'Fase2') {
      this.moedas.create(200, 450, 'moeda');
      this.moedas.create(200, 130, 'moeda');
      this.moedas.create(320, 200, 'moeda');
      this.diamantes.create(600, 350, 'diamante');
      this.bombas.create(500, 300, 'bomba');
      scene.physics.add.collider(this.bombas, castle);


      this.chave = scene.physics.add.sprite(50, 130, 'chave').setVisible(true);
    }

    // Animação flutuante da chave
    scene.tweens.add({
      targets: this.chave,
      y: this.chave.y - 10,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Física básica
    this.moedas.children.iterate(m => m.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6)));
    this.diamantes.children.iterate(d => d.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6)));
    this.bombas.children.iterate(b => {
      b.setScale(0.7);
      b.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
    });

    scene.physics.add.collider(this.moedas, plataformas);
    scene.physics.add.collider(this.moedas, castle);
    scene.physics.add.collider(this.diamantes, plataformas);
    scene.physics.add.collider(this.diamantes, castle);
    scene.physics.add.collider(this.bombas, plataformas);

    scene.physics.add.collider(this.chave, plataformas);

    // HUD da chave
    this.chaveHud = scene.add.image(250, 32, 'chave')
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
    if (this.temChave) return;

    this.temChave = true;
    chave.disableBody(true, true);

    // Cria uma cópia da imagem para animar até o HUD
    const chaveAnimada = this.scene.add.image(chave.x, chave.y, 'chave').setScale(1);

    this.scene.tweens.add({
      targets: chaveAnimada,
      x: 250,
      y: 32,
      scale: 0.5,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        chaveAnimada.destroy();
        this.chaveHud.setVisible(true);
      }
    });
  }

  coletarMoeda(player, moeda) {
    moeda.disableBody(true, true);
    this.score += 10;
    window.scoreGlobal = this.score;
    this.scoreText.setText('Score: ' + this.score);
  }

  coletarDiamante(player, diamante) {
    diamante.disableBody(true, true);
    this.score += 50;
    window.scoreGlobal = this.score;
    this.scoreText.setText('Score: ' + this.score);
  }

  tocarBomba(player, bomba) {
    bomba.disableBody(true, true);
    this.score -= 15;
    window.scoreGlobal = this.score;
    this.scoreText.setText('Score: ' + this.score);

    if (this.score < 0) {
      window.scoreGlobal = 0;
      this.scene.scene.start('GameOver');
    }
  }
}
