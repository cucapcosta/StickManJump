var cursors;
var player;
class PlayScene extends Phaser.Scene{
    constructor(){
        super({key: 'PlayScene',
            physics: {
            default: 'arcade',
            arcade:{
                gravity: {y: 300},
                debug: true
            }
        }})
        
    }

    //Carregando recursos
    preload(){
        this.load.image('bgazul', '../assets/fundo.png');
        this.load.spritesheet('player', '../assets/playerAnim.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('nuvem', '../assets/nuvem.png');
        this.load.image('plataforma', '../assets/plataforma.png');
        this.load.image('chao', '../assets/chao.png');
    }
    create(){
        //Adicionando input de teclado
        cursors = this.input.keyboard.createCursorKeys();
        //Instanciando Cenário
        this.add.image(200,200,'bgazul').setScale(4.4);
        var chao = this.physics.add.staticImage(200, 378,  'chao');
        var plataforma1 = this.physics.add.staticImage(50, 300, 'plataforma');
        var plataforma2 = this.physics.add.staticImage(200, 250, 'plataforma');
        var plataforma3 = this.physics.add.staticImage(300, 200, 'plataforma');
        var plataforma4 = this.physics.add.staticImage(200, 100, 'plataforma');
        //Instanciando Player
        player = this.physics.add.sprite(300, 250, 'player')
        .setCollideWorldBounds(true)
        .setScale(0.3);
        //Animações
        this.anims.create({

            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 10

        });
        this.anims.create({

            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {start: 1, end: 3}),
            frameRate: 10

        });
        //Física
        var plataformas = [plataforma1, plataforma2, plataforma3, plataforma4, chao];
        for(var i = 0; i<plataformas.length; i++){
            this.physics.add.collider(player, plataformas[i]);
        }
    }
    update(){
        if(cursors.up.isDown){
            player.setVelocityY(-200);
            var releaseJump = true;
        }else{
            if(releaseJump){
                player.setVelocityY(0);
                releaseJump = false;
            }
        }
    }



}

