class EndScene extends Phaser.Scene{
    constructor(){
        super({key: 'EndScene'})
        
    }

    preload(){
        this.load.image('fundofim', '../assets/endscreen.png');
        this.load.image('botao', '../assets/play.png');
        console.log('funcionou');
    }
    
    create(){
        this.add.image(200, 200, 'fundofim').setScale(1);
        this.add.image(200, 300, 'botao').setScale(1.2).setInteractive().on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () =>{
            this.scene.stop("EndScene");
            this.scene.start("StartScene");
            })
    }
}