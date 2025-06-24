class Player {
    constructor(scene, x, y) {
      this.scene = scene;
      this.sprite = scene.physics.add.sprite(x, y, 'fr1');
      this.sprite.setBounce(0.2);
      this.sprite.setCollideWorldBounds(true);
      this.cursors = scene.input.keyboard.createCursorKeys();
    }
  
    preload() {
      const load = this.scene.load;
      load.image('fr1', 'assets/wmn2_fr1_transparent.png');
      load.image('fr2', 'assets/wmn2_fr2_transparent.png');
      load.image('lf1', 'assets/wmn2_lf1_transparent.png');
      load.image('lf2', 'assets/wmn2_lf2_transparent.png');
      load.image('rt1', 'assets/wmn2_rt1_transparent.png');
      load.image('rt2', 'assets/wmn2_rt2_transparent.png');
    }
  
    animacoes() {
      const anims = this.scene.anims;
      anims.create({
        key: 'left',
        frames: [{ key: 'lf1' }, { key: 'lf2' }],
        frameRate: 6,
        repeat: -1,
      });
  
      anims.create({
        key: 'turn',
        frames: [{ key: 'fr1' }, { key: 'fr2' }],
        frameRate: 2,
        repeat: -1,
      });
  
      anims.create({
        key: 'right',
        frames: [{ key: 'rt1' }, { key: 'rt2' }],
        frameRate: 6,
        repeat: -1,
      });
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
  