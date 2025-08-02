class Fim extends Phaser.Scene {
    constructor() {
      super('Fim');
    }
  
    preload() {
      this.load.image('FimBG', 'assets/Final.png'); 
    }
  
    create() {
      this.add.image(0, 0, 'FimBG').setOrigin(0, 0).setDisplaySize(800, 600);
  
      const FinalHistoria = 
        "Você conseguiu! \n" +
        "Parabéns! \n" +
        "A princesa está feliz e em segurança!\n"+
        "Você conseguiu trazer ela para casa!\n";
        
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5); 
      
        // fundo FinalHistória
        graphics.fillRoundedRect(60, 60, 370, 140, 20); 

        // fundo do botão
        graphics.fillRoundedRect(250, 515, 300, 50, 20); 

    
    
      this.add.text(80, 80, FinalHistoria, {
        font: '20px Arial',
        fill: '#ffffff',
        align: 'left'
      });
  
     
  
      this.add.text(300, 530, 'Jogar novamente', {
        font: '24px Arial',
        fill: '#ffffff'
      });
  
      this.input.once('pointerdown', () => {
        this.scene.start('Intro');
      });

      this.input.keyboard.once('keydown-ENTER', () => {
        this.scene.start('Intro');
      });
    }
  }
  