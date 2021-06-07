import game from "../main.js";
import Player from "../prefabs/Player.js";
export default class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            //backgroundColor: '#A3C941',
            color: '#ffffff',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //add bg
        this.bg = this.add.tileSprite(game.config.width/2, game.config.height/2, 768, 768, "menu");
        this.bg.alpha = 0.7;

         // add title
        this.add.image(game.config.width/ 2, game.config.height/2 - 60, 'title');
        

        //try to add a bouncing blushie
        //this.blushie = new Blushie(this, this.defaultSpawnObject.x + 500, this.defaultSpawnObject.y, "blushie");
        //this.anims.play("player_jump", true);

        this.bgm = this.sound.add('startMenu_bgm', {volume: 0.1});
        //this.bgm.play();
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press SPACE to Start', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 200, 'Press Shift for Credits', menuConfig).setOrigin(0.5);
        //start scenes
        this.start = this.add.text(game.config.width/2, game.config.height/2 + 200, 'Press Shift for Credits', menuConfig).setOrigin(0.5).setInteractive();
        this.start.on("pointerdown", () => {
            if (this.active){
                this.scene.start('gameManagerScene');
                this.cursorClick = this.sound.add('sfx_cursorClick', {volume: 0.1});
                this.cursorClick.play();
            }
        }, this);
    

        this.cursors.on('down', () => {this.scene.start('gameManagerScene')});
        this.cursors.shift.on('down', () => {this.scene.start('creditScene')});
        
    }

    update(time, delta){
        this.bg.tilePositionX -= 1;
        this.animation = this.anims.play("player_jump", true);
    }
}