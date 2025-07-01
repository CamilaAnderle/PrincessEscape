class Fase1 extends Phaser.Scene {
    constructor() {
      super('Fase1');
    }
  
    preload() {
      this.load.image('background', 'assets/Background.png');
      this.load.image('castle', 'assets/castle.png');
      this.load.image('liquid', 'assets/liquidWaterTop.png');
      this.load.image('ground', 'assets/platform.png');
      this.load.image('sunken', 'assets/liquidWater.png');
      this.load.image('baus', 'assets/bridgeLogs.png');
      this.load.image('porta', 'assets/door_closedMid.png');
      this.load.image('portaTopo', 'assets/door_closedTop.png');
      this.load.image('castleHalf', 'assets/castleHalfMid.png');

      
      ColecionaPontos.preload(this);

  
      // Carrega os assets da jogadora
      let p = new Player(this);
      p.preload();
    }
  
    create() {
      this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);
  
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      platforms.create(850, 400, 'ground');
      platforms.create(-100, 520, 'ground');
      platforms.create(-80, 200, 'ground');
  
      const castle = this.physics.add.staticGroup();
      castle.create(275, 570, 'castle');
      castle.create(275, 530, 'castle');
      castle.create(275, 470, 'castle');
      castle.create(250, 200, 'castleHalf');
      castle.create(500, 350, 'castleHalf');
      castle.create(450, 100, 'castleHalf');
      castle.create(620, 150, 'baus');
      castle.create(690, 150, 'baus');
      castle.create(760, 150, 'baus');
  
      const water = this.physics.add.staticGroup();
      const waterTiles = [135, 205, 345, 415, 485, 555, 625, 695, 765];
      for (let x of waterTiles) {
        water.create(x, 530, 'liquid');
        water.create(x, 580, 'sunken');
      }
  
      // Cria o jogador com a classe Player
      this.player = new Player(this, 50, 450);
      this.player.animacoes();
  
      this.physics.add.collider(this.player.sprite, platforms);
      this.physics.add.collider(this.player.sprite, castle);

      this.pontos = new ColecionaPontos(this, platforms, castle);
      this.pontos.ativarColetas(this.player);

  
      new Porta(this, 750, 100, 'Fase2', 'porta');
      this.physics.add.staticImage(750, 50, 'portaTopo');
  
      this.physics.add.overlap(this.player.sprite, water, () => {
        this.scene.start('GameOver');
      }, null, this);
    }
  
    update() {
      this.player.update();
    }
  }