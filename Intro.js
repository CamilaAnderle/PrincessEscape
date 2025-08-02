class Intro extends Phaser.Scene {
    constructor() {
      super('Intro');
    }
  
    preload() {
      this.load.image('introBG', 'assets/castelo.png'); // coloque uma imagem de fundo chamada intro.png na pasta assets
    }
  
    create() {
      this.add.image(0, 0, 'introBG').setOrigin(0, 0).setDisplaySize(800, 600);
  
      const textoHistoria = 
        "Em um reino distante, uma princesa corajosa foi aprisionada\n" +
        "em um castelo sombrio, rodeado por água. Mas tem um problema: \n" +
        "A princesa não sabe nadar!\n"+
        "Para escapar, ela precisa superar\n"+
        "armadilhas, recolher tesouros e encontrar a chave mágica\n" +
        "que abre o portão para a liberdade.";
  
      const regras = 
        "\nRegras do jogo:\n" +
        "• +10 pontos por moeda\n" +
        "• +50 pontos por diamante\n" +
        "• -15 pontos se tocar em uma bomba\n" +
        "• Morre ao cair na água\n" +
        "• Só avança após pegar a chave";
        
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5); 
      
        graphics.fillRoundedRect(90, 70, 620, 150, 20);     // fundo história
        graphics.fillRoundedRect(90, 240, 620, 150, 20);    // fundo regras
        graphics.fillRoundedRect(190, 490, 430, 40, 20);    // fundo botão

    
    
      this.add.text(100, 80, textoHistoria, {
        font: '20px Arial',
        fill: '#ffffff',
        align: 'center'
      });
  
      this.add.text(100, 250, regras, {
        font: '18px Courier New',
        fill: '#ffff99',
        align: 'left'
      });
  
      this.add.text(200, 500, 'Clique ou aperte Enter para começar...', {
        font: '24px Arial',
        fill: '#ffffff'
      });
  
      this.input.once('pointerdown', () => {
        this.scene.start('Fase1');
      });

      this.input.keyboard.once('keydown-ENTER', () => {
        this.scene.start('Fase1');
      });
    }
  }
  