class Porta {
  constructor(scene, x, y, destino, imagem = 'porta', pontos = null) {
    this.scene = scene;
    this.objeto = scene.physics.add.staticImage(x, y, imagem);
    this.destino = destino;
    this.pontos = pontos;

    scene.physics.add.overlap(scene.player.sprite, this.objeto, () => {
      // Verifica se a chave foi coletada
      if (!this.pontos || this.pontos.temChave) {
        scene.scene.start(this.destino);
      } 
    }, null, scene);
  }
}
