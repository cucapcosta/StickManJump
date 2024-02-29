class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
        
    }

    preload(){
        this.load.image('bgazul', 'StickManJump/assets/fundo.png');
        this.load.image('botao', '../assets/play.png');
        this.load.image('logo', '../assets/logo.png');
    }
    
    create(){
        this.add.image(200, 200, 'bgazul').setScale(4.4);
        this.add.image(200, 150, 'logo').setScale(4);
        this.add.image(200, 300, 'botao').setScale(1.2).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
            this.scene.stop("StartScene");
            this.scene.start("PlayScene");
            })
    }
}