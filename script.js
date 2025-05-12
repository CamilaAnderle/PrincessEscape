function preload() {
  this.load.image('background', 'assets/Background.png');
  this.load.image('castle', 'assets/castle.png');
  this.load.image('liquid', 'assets/liquidWaterTop.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('sunken', 'assets/liquidWater.png');
  this.load.image('baus', 'assets/bridgeLogs.png');
  this.load.image('porta', 'assets/door_closedMid.png');
  this.load.image('portaTopo', 'assets/door_closedTop.png');
  this.load.image('castleHalf', 'assets/castleHalfMid.png');

  // Carregar imagens separadas para animação
  this.load.image('fr1', 'assets/wmn2_fr1_transparent.png');
  this.load.image('fr2', 'assets/wmn2_fr2_transparent.png');
  this.load.image('lf1', 'assets/wmn2_lf1_transparent.png');
  this.load.image('lf2', 'assets/wmn2_lf2_transparent.png');
  this.load.image('rt1', 'assets/wmn2_rt1_transparent.png');
  this.load.image('rt2', 'assets/wmn2_rt2_transparent.png');
}

var player;
var platforms;
var cursors;
var water;
var castle;
var porta;
var gameOver = false;

function create() {
  this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(800, 600);

  // Plataformas
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  //platforms.create(400, 400, 'ground');
  platforms.create(600, 400, 'ground');
  platforms.create(-100, 520, 'ground');
  platforms.create(-50, 200, 'ground');

  // Castelo
  castle = this.physics.add.staticGroup();
  castle.create(275, 570, 'castle');
  castle.create(275, 530, 'castle');
  castle.create(275, 470, 'castle');
  castle.create(275, 300, 'castleHalf');
  castle.create(100, 350, 'castleHalf');
  castle.create(400, 150, 'baus');
  castle.create(500, 150, 'baus');
  castle.create(570, 150, 'baus');
  castle.create(250, 50, 'baus');

  // Água
  water = this.physics.add.staticGroup();
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
  water.create(485, 580, 'sunken');
  water.create(415, 580, 'sunken');
  water.create(345, 580, 'sunken');
  water.create(205, 580, 'sunken');
  water.create(135, 580, 'sunken');

  // Porta
  porta = this.physics.add.staticGroup();
  porta.create(570, 100, 'porta');
  porta.create(570, 50, 'portaTopo');

  // Jogador (imagem inicial: fr1)
  player = this.physics.add.sprite(50, 450, 'fr1');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, castle);

  // Animações com imagens separadas
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

  // Teclado
  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  if (gameOver) return;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn', true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
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
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
