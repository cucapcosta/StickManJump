var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 400,

    scene: [StartScene, PlayScene, EndScene],
    
};

var game = new Phaser.Game(config);

