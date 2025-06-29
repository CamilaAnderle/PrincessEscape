class Fase2 extends Phaser.Scene {
    constructor() {
      super('Fase2');
    }
  
    preload() {
      this.load.image('background', 'assets/Background.png');
      this.load.image('castle', 'assets/castle.png');
      this.load.image('liquid', 'assets/liquidWaterTop.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('sunken', 'assets/liquidWater.png');
      this.load.image('baus', 'assets/bridge.png');
      this.load.image('porta', 'assets/door_closedMid.png');
      this.load.image('portaTopo', 'assets/door_closedTop.png');
      this.load.image('castleHalf', 'assets/castleHalfMid.png');
      this.load.image('dica', 'assets/boxCoin.png');
      this.load.image('premio', 'assets/lock_yellow.png');
      this.load.image('saida', 'assets/signExit.png');
      this.load.image('escada', 'assets/fence.png');
      this.load.image('mensagemDica', 'assets/mensagem_dica.png');
  
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
  
      const dica = this.physics.add.staticGroup();
      dica.create(750, 420, 'dica');
  
      const premio = this.physics.add.staticGroup();
      premio.create(50, 130, 'premio');
  
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
  
      new Porta(this, 750, 100, 'Fase1', 'saida');
  
      const porta = this.physics.add.staticGroup();
      porta.create(5, 480, 'porta');
      porta.create(5, 420, 'portaTopo');
  
      this.physics.add.overlap(this.player.sprite, porta, () => {
        this.scene.start('Fase1');
      });
  
      this.physics.add.overlap(this.player.sprite, water, () => {
        this.scene.start('GameOver');
      });
  
      this.mensagemDica = this.add.image(400, 300, 'mensagemDica')
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(10)
        .setScale(0.7);
      this.mensagemDica.setVisible(false);
  
      this.physics.add.overlap(this.player.sprite, dica, () => {
        this.mensagemDica.setVisible(true);
        this.time.delayedCall(5000, () => {
          this.mensagemDica.setVisible(false);
        });
        dica.clear(true);
      }, null, this);
    }
  
    update() {
      this.player.update();
    }
  }