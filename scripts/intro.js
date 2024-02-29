class StartScene extends Phaser.Scene{
    constructor(){
        super({key: 'StartScene'})
        
    }

    preload(){
        this.load.image('bgazul', '/assets/fundo.PNG');
        this.load.image('botao', '/assets/play.PNG');
        this.load.image('logo', '/assets/logo.PNG');
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