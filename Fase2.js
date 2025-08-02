class Fase2 extends Phaser.Scene {
  constructor() {
    super('Fase2');
  }

  preload() {
    this.load.image('background', 'assets/fundo.png');
    this.load.image('castle', 'assets/castle.png');
    this.load.image('liquid', 'assets/liquidWaterTop.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('sunken', 'assets/liquidWater.png');
    this.load.image('baus', 'assets/bridge.png');
    this.load.image('portaAberta', 'assets/door_openMid.png');
    this.load.image('portaTopoAberta', 'assets/door_openTop.png');      
    this.load.image('castleHalf', 'assets/castleHalfMid.png');
    this.load.image('saida', 'assets/signExit.png');
    this.load.image('escada', 'assets/fence.png');
    this.load.image('mensagemDica', 'assets/mensagem_dica.png');
    this.load.image('chave', 'assets/keyYellow.png');

    // Carrega os assets da jogadora
    let p = new Player(this);
    p.preload();
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);

    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(900, 470, 'ground');
    platforms.create(-100, 520, 'ground');
    platforms.create(-100, 180, 'ground');

    const castle = this.physics.add.staticGroup();
    castle.create(135, 510, 'castleHalf');
    castle.create(185, 510, 'castleHalf');
    castle.create(235, 510, 'castleHalf');
    castle.create(285, 510, 'castleHalf');
    castle.create(295, 455, 'escada');
    castle.create(355, 405, 'escada');
    castle.create(750, 140, 'baus');
    castle.create(550, 180, 'baus');
    castle.create(210, 180, 'baus');
    castle.create(335, 250, 'baus');
    castle.create(600, 400, 'baus');
    castle.create(480, 350, 'baus');

    const water = this.physics.add.staticGroup();
    const waterTiles = [135, 205, 275, 345, 415, 485, 555, 625, 695, 765];
    for (let x of waterTiles) {
      water.create(x, 530, 'liquid');
      water.create(x, 580, 'sunken');
    }

    this.player = new Player(this, 60, 450);
    this.player.animacoes();

    this.physics.add.collider(this.player.sprite, platforms);
    this.physics.add.collider(this.player.sprite, castle);

    this.pontos = new ColecionaPontos(this, platforms, castle, 'Fase2');
    this.pontos.ativarColetas(this.player);

    const porta = this.physics.add.staticGroup();
    porta.create(5, 480, 'portaAberta');
    porta.create(5, 430, 'portaTopoAberta');

    this.physics.add.overlap(this.player.sprite, water, () => {
      this.scene.start('GameOver');
    });

    const saida = this.physics.add.staticImage(750, 100, 'saida');

    this.physics.add.overlap(this.player.sprite, saida, () => {
      if (this.pontos.temChave) {
        this.scene.start('FimJogo');
      }
    }, null, this);

  }

  update() {
    this.player.update();
  }
}