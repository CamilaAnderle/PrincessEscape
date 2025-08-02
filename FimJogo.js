class FimJogo extends Phaser.Scene {
    constructor() {
      super('FimJogo');
    }
  
    preload() {
      this.load.image('fundo', 'assets/fundoFeliz.png');
      this.load.image('princesa', 'assets/wmn2_fr2_transparent.png');
      this.load.image('ground', 'assets/platform.png');

      let p = new Player(this);
      p.preload();
    }
  
    create() {
        
      // Fundo da cena
      this.add.image(400, 300, 'fundo').setScale(0.7);

      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  
      this.player = new Player(this, 50, 450);
      this.player.animacoes();
  
      this.physics.add.collider(this.player.sprite, platforms);
  
      // Texto de final feliz
      this.add.text(400, 200, 'A princesa está indo para casa!', {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial',
        stroke: '#000',
        strokeThickness: 4,
      }).setOrigin(0.5);
    }

    update() {
        this.player.update();

        if (this.player.sprite.x >= 770) {
            this.scene.start('Fim');
        }
        
      }
  }
  