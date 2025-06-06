class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.sprite = scene.physics.add.sprite(x, y, 'fr1');
    this.sprite.setBounce(0.2);
    this.sprite.setCollideWorldBounds(true);
    this.cursors = scene.input.keyboard.createCursorKeys();
  }

  update() {
    const player = this.sprite;
    const cursors = this.cursors;

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
}

class Porta {
  constructor(scene, x, y, destino, imagem = 'porta') {
    this.scene = scene;
    this.objeto = scene.physics.add.staticImage(x, y, imagem);
    this.destino = destino;

    scene.physics.add.overlap(scene.player.sprite, this.objeto, () => {
      scene.scene.start(this.destino);
    }, null, scene);
  }
}


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

    // Cria jogador com classe Player
    this.player = new Player(this, 50, 450);

    this.physics.add.collider(this.player.sprite, platforms);
    this.physics.add.collider(this.player.sprite, castle);

    // Cria porta com classe Porta (duas imagens empilhadas)
    new Porta(this, 750, 100, 'Fase2', 'porta');
    this.physics.add.staticImage(750, 50, 'portaTopo');

    // Game over se tocar na água
    this.physics.add.overlap(this.player.sprite, water, () => {
      this.scene.start('GameOver');
    }, null, this);
  }

  update() {
    this.player.update();
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
    this.load.image('mensagemDica', 'assets/mensagem_dica.png');


    this.load.image('fr1', 'assets/wmn2_fr1_transparent.png');
    this.load.image('fr2', 'assets/wmn2_fr2_transparent.png');
    this.load.image('lf1', 'assets/wmn2_lf1_transparent.png');
    this.load.image('lf2', 'assets/wmn2_lf2_transparent.png');
    this.load.image('rt1', 'assets/wmn2_rt1_transparent.png');
    this.load.image('rt2', 'assets/wmn2_rt2_transparent.png');
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

    this.player = new Player(this, 60, 450);

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

    // Mensagem de dica (inicialmente invisível e em tamanho reduzido)
    this.mensagemDica = this.add.image(400, 300, 'mensagemDica')
    .setOrigin(0.5)
    .setScrollFactor(0)
    .setDepth(10)
    .setScale(0.7); // reduz o tamanho da imagem pela metade
    this.mensagemDica.setVisible(false);

    // Ao encostar em dica, mostrar a mensagem
    this.physics.add.overlap(this.player.sprite, dica, () => {
    this.mensagemDica.setVisible(true);
    this.time.delayedCall(5000, () => {
      this.mensagemDica.setVisible(false);
    });
    dica.clear(true); // opcional: remove o item depois de coletado
    }, null, this);

  }

  update() {
    this.player.update();
  }
}

  
  class GameOver extends Phaser.Scene {
    constructor() {
      super('GameOver');
    }
  
    preload() {
      this.load.image('gameOverBG', 'assets/gameOver.png');
    }
  
    create() {
      this.add.image(0, 0, 'gameOverBG').setOrigin(0, 0).setDisplaySize(800, 600);
  
      this.input.once('pointerdown', () => {
        this.scene.start('Fase1'); // reinicia a fase 1 ao clicar
      });
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
  scene: [Fase1, Fase2, GameOver],
};

const game = new Phaser.Game(config);
