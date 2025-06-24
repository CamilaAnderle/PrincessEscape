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