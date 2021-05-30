import game from "../main.js";
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Enemy.js";

export default class Tutorial extends Phaser.Scene {
    constructor(){
        super("tutorialScene");
    }

    preload(){

    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        let tutorialConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#A3C941',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(20, 20, game.config.width - 40, game.config.height - 40, 0xFFFFFF).setOrigin(0, 0);

        //this.bgm = this.sound.add('startMenu_bgm', {volume: 0.1, loop: true});
        //this.bgm.play();

        this.add.text(game.config.width/2, game.config.height/2, 'A < and > D', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 40, 'SPACE to Jump', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 80, 'Right Arrow to Start', tutorialConfig).setOrigin(0.5);

        this.cameras.main.setBackgroundColor(0x666666);
        this.groundHitbox = this.physics.add.sprite(0,480-16);
        this.groundHitbox.body.setImmovable(true);
        this.groundHitbox.body.setAllowGravity(false);
        this.groundHitbox.body.setSize(this.scale.width + 200, 16, false);
        this.groundHitbox.setOrigin(0);
        this.add.rectangle(16, 456, 610, 200, 0x000000).setOrigin(0);

        // create the player
        this.PLAYER_SPAWN_POS = new Phaser.Math.Vector2(60, 120);
        this.player = new Player(this, this.PLAYER_SPAWN_POS.x, this.PLAYER_SPAWN_POS.y, 'moving_blush');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundHitbox);

        this.ENEMY_SPAWN_POS = new Phaser.Math.Vector2(100,430);
        this.enemy = new Enemy(this, this.ENEMY_SPAWN_POS.x, this.ENEMY_SPAWN_POS.y, 'enemy');
        this.physics.add.collider(this.enemy, this.groundHitbox);

        this.cursors.right.on('down', () => {this.scene.start('gameManagerScene')});

        //this.enemy.anims.play('enemy_move', true);
        
        //this.scene.start("gameManagerScene");
    }
    

    update(time, delta){
        this.player.update();
        this.enemy.update();
    }
}