var cursors;
var player;
var andando;
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
        var plataforma4 = this.physics.add.staticImage(150, 150, 'plataforma');
        var nuvem = this.physics.add.staticImage(50, 100, 'nuvem');
        //Instanciando Player
        player = this.physics.add.sprite(300, 250, 'player')
        .setCollideWorldBounds(true)
        .setScale(0.3);
        //Animações
        player.anims.create({

            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1

        });
        player.anims.create({

            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {start: 1, end: 3}),
            frameRate: 10,
            repeat: -1

        });
        //Física
        var plataformas = [plataforma1, plataforma2, plataforma3, plataforma4, chao];
        for(var i = 0; i<plataformas.length; i++){
            this.physics.add.collider(player, plataformas[i]);
        }
        this.physics.add.overlap(player, nuvem, () => {
            this.scene.stop('PlayScene');
            this.scene.start('EndScene');
        });
    }
    
    update(){
        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-200);
            var releaseJump = true;
        }else{
            if(releaseJump){
                player.setVelocityY(0);
                releaseJump = false;
            }
        }

        if (cursors.left.isDown){
            player.setVelocityX(-100);
            player.setFlipX(true);
            animado();
        }else if(cursors.right.isDown){
            player.setVelocityX(100);
            player.setFlipX(false);
            animado();
        }else{
            player.setVelocityX(0);
            player.anims.play("idle");
            andando = false;
        }
    }
}
function animado(){
    if (!andando){
        andando = true;
        player.anims.play("walk");
    }
}
