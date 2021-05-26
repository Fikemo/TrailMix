import game from "../main.js";
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
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.add.rectangle(20, 20, game.config.width - 40, game.config.height - 40, 0xFFFFFF).setOrigin(0, 0);

        this.bgm = this.sound.add('startMenu_bgm', {volume: 0.1, loop: true});
        this.bgm.play();

        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Press SPACE to Start', menuConfig).setOrigin(0.5);
        //this.menuConfig.fontSize = '30px';
        this.add.text(game.config.width/2, game.config.height/2, 'Trail Mix', menuConfig).setOrigin(0.5);
        this.cursors.space.on('down', () => {this.scene.start('gameManagerScene')});
        //this.scene.start("gameManagerScene");
    }

    update(time, delta){
        
    }
}