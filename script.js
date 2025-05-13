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
  
      this.load.image('fr1', 'assets/wmn2_fr1_transparent.png');
      this.load.image('fr2', 'assets/wmn2_fr2_transparent.png');
      this.load.image('lf1', 'assets/wmn2_lf1_transparent.png');
      this.load.image('lf2', 'assets/wmn2_lf2_transparent.png');
      this.load.image('rt1', 'assets/wmn2_rt1_transparent.png');
      this.load.image('rt2', 'assets/wmn2_rt2_transparent.png');
    }
  
    create() {
      this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);
  
      // Plataformas
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      platforms.create(600, 400, 'ground');
      platforms.create(-100, 520, 'ground');
      platforms.create(-50, 200, 'ground');
  
      // Castelo
      const castle = this.physics.add.staticGroup();
      castle.create(275, 570, 'castle');
      castle.create(275, 530, 'castle');
      castle.create(275, 470, 'castle');
      castle.create(275, 300, 'castleHalf');
      castle.create(100, 350, 'castleHalf');
      castle.create(450, 150, 'baus');
      castle.create(500, 150, 'baus');
      castle.create(570, 150, 'baus');
  
      // Água
      const water = this.physics.add.staticGroup();
      water.create(135, 530, 'liquid');
      water.create(205, 530, 'liquid');
      water.create(345, 530, 'liquid');
      water.create(415, 530, 'liquid');
      water.create(485, 530, 'liquid');
      water.create(555, 530, 'liquid');
      water.create(625, 530, 'liquid');
      water.create(625, 580, 'sunken');
      water.create(555, 580, 'sunken');
      water.create(485, 580, 'sunken');
      water.create(415, 580, 'sunken');
      water.create(345, 580, 'sunken');
      water.create(205, 580, 'sunken');
      water.create(135, 580, 'sunken');
  
      // Porta
      const porta = this.physics.add.staticGroup();
      porta.create(550, 100, 'porta');
      porta.create(550, 50, 'portaTopo');
  
      // Jogador
      this.player = this.physics.add.sprite(50, 450, 'fr1');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(this.player, platforms);
      this.physics.add.collider(this.player, castle);
  
      // Animações
      this.anims.create({
        key: 'left',
        frames: [{ key: 'lf1' }, { key: 'lf2' }],
        frameRate: 6,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'fr1' }, { key: 'fr2' }],
        frameRate: 2,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'right',
        frames: [{ key: 'rt1' }, { key: 'rt2' }],
        frameRate: 6,
        repeat: -1,
      });
  
      // Controles
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Transição de fase ao tocar a porta
      this.physics.add.overlap(this.player, porta, () => {
        this.scene.start('Fase2');
      }, null, this);
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
      }
  
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }

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


  
      this.load.image('fr1', 'assets/wmn2_fr1_transparent.png');
      this.load.image('fr2', 'assets/wmn2_fr2_transparent.png');
      this.load.image('lf1', 'assets/wmn2_lf1_transparent.png');
      this.load.image('lf2', 'assets/wmn2_lf2_transparent.png');
      this.load.image('rt1', 'assets/wmn2_rt1_transparent.png');
      this.load.image('rt2', 'assets/wmn2_rt2_transparent.png');
    }
  
    create() {
      this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);
  
      // Plataformas
      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
      platforms.create(600, 400, 'ground');
      platforms.create(-100, 520, 'ground');
      platforms.create(-100, 180, 'ground');
  
      // Castelo
      const castle = this.physics.add.staticGroup();
      castle.create(135, 510, 'castleHalf');
      castle.create(185, 510, 'castleHalf');
      castle.create(235, 510, 'castleHalf');
      castle.create(285, 510, 'castleHalf');
      castle.create(295, 455, 'escada');
      castle.create(355, 405, 'escada');
      castle.create(540, 140, 'baus');
      castle.create(335, 100, 'baus');
      castle.create(210, 180, 'baus');
      castle.create(335, 250, 'baus');

      //Dica
      const dica = this.physics.add.staticGroup();
      dica.create(480, 350, 'dica');

      //Premio
      const premio = this.physics.add.staticGroup();
      premio.create(50, 130, 'premio');
  
      // Água
      const water = this.physics.add.staticGroup();
      water.create(135, 530, 'liquid');
      water.create(205, 530, 'liquid');
      water.create(205, 530, 'liquid');
      water.create(275, 530, 'liquid');
      water.create(345, 530, 'liquid');
      water.create(415, 530, 'liquid');
      water.create(485, 530, 'liquid');
      water.create(555, 530, 'liquid');
      water.create(625, 530, 'liquid');
      water.create(275, 580, 'sunken');
      water.create(625, 580, 'sunken');
      water.create(555, 580, 'sunken');
      water.create(485, 580, 'sunken');
      water.create(415, 580, 'sunken');
      water.create(345, 580, 'sunken');
      water.create(205, 580, 'sunken');
      water.create(135, 580, 'sunken');
  
      // Porta
      const porta = this.physics.add.staticGroup();
      porta.create(540, 100, 'saida');
      porta.create(5, 480, 'porta');
      porta.create(5, 420, 'portaTopo');
  
      // Jogador
      this.player = this.physics.add.sprite(60, 450, 'fr1');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);
  
      this.physics.add.collider(this.player, platforms);
      this.physics.add.collider(this.player, castle);
  
      // Animações
      this.anims.create({
        key: 'left',
        frames: [{ key: 'lf1' }, { key: 'lf2' }],
        frameRate: 6,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'fr1' }, { key: 'fr2' }],
        frameRate: 2,
        repeat: -1,
      });
  
      this.anims.create({
        key: 'right',
        frames: [{ key: 'rt1' }, { key: 'rt2' }],
        frameRate: 6,
        repeat: -1,
      });
  
      // Controles
      this.cursors = this.input.keyboard.createCursorKeys();
  
      // Transição de fase ao tocar a porta
      this.physics.add.overlap(this.player, porta, () => {
        this.scene.start('Fase1');
      }, null, this);
    }
  
    update() {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
      } else {
        this.player.setVelocityX(0);
        this.player.anims.play('turn', true);
      }
  
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
      }
    }
  }
  

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
  scene: [Fase1, Fase2],
};

const game = new Phaser.Game(config);
