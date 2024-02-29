var cursors;
var player;
var andando;
var pontos = 0;
var pontoTexto;
class PlayScene extends Phaser.Scene{
    constructor(){
        super({key: 'PlayScene',
            physics: {
            default: 'arcade',
            arcade:{
                gravity: {y: 300},
                debug: false
            }
        }})
        
    }

    //Carregando recursos
    preload(){
        this.load.image('bgazul', 'StickManJump/assets/fundo.png');
        this.load.spritesheet('player', 'StickManJump/assets/playerAnim.png', {frameWidth: 128, frameHeight: 128});
        this.load.image('nuvem', 'StickManJump/assets/nuvem.png');
        this.load.image('plataforma', 'StickManJump/assets/plataforma.png');
        this.load.image('chao', 'StickManJump/assets/chao.png');
        this.load.image('moeda', 'StickManJump/assets/coin.png');
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
        var moeda1 = this.physics.add.image(100, 300, 'moeda').setBounce(0.3);
        var moeda2 = this.physics.add.image(200, 200, 'moeda').setBounce(0.3);
        var moeda3 = this.physics.add.image(300, 150, 'moeda').setBounce(0.3);
        var moeda4 = this.physics.add.image(150, 100, 'moeda').setBounce(0.3);
        //Instanciando texto de placar
        pontoTexto = this.add.text(16, 16, 'Pontos: 0', {fontSize: '16x', fill: '#000'});
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
        var moedas = [moeda1, moeda2, moeda3,moeda4]
        var plataformas = [plataforma1, plataforma2, plataforma3, plataforma4, chao];
        for(var i = 0; i<plataformas.length; i++){
            this.physics.add.collider(player, plataformas[i]);
        }

        for (var j = 0; j<moedas.length; j++){
            for(var i = 0; i<plataformas.length; i++){
                this.physics.add.collider(moedas[j], plataformas[i]);
            }
        }
        
        this.physics.add.overlap(player, nuvem, () => {
            pontos = 0;
            this.scene.stop('PlayScene');
            this.scene.start('EndScene');
        });
        this.physics.add.overlap(player, moeda1, () => {
            pontos += 1;
            moeda1.disableBody(true, true);
            pontoTexto.setText ("Pontos: "+ pontos);
        });
        this.physics.add.overlap(player, moeda2, () => {
            pontos += 1;
            moeda2.disableBody(true, true);
            pontoTexto.setText ("Pontos: "+ pontos);
        });
        this.physics.add.overlap(player, moeda3, () => {
            pontos += 1;
            moeda3.disableBody(true, true);
            pontoTexto.setText ("Pontos: "+ pontos);
        });
        this.physics.add.overlap(player, moeda4, () => {
            pontos += 1;
            moeda4.disableBody(true, true);
            pontoTexto.setText ("Pontos: "+ pontos);
        });
        
        
    }
    
    update(){
        //verifica se player pode pular quando se aperta setinha para cima
        if(cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-200);
            var releaseJump = true;
        }else{
            // Bota a velocidade em 0 apenas no momento que gravidade aplica; Se não fizer esse check, velocidade vertical é constantemente zerada
            if(releaseJump){
                player.setVelocityY(0);
                releaseJump = false;
            }
        }
        //movimento lateral e chamado da animação
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
//funcão para chamar a animação apenas uma vez
function animado(){
    if (!andando){
        andando = true;
        player.anims.play("walk");
    }
}
