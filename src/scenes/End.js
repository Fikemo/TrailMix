import game from "../main.js";


export default class End extends Phaser.Scene{
    constructor(){
        super("endScene");
    }

    preload() {
    }
        create(){let instructConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            //backgroundColor: '#A3C941',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(this.scale.width/2, this.scale.height/2 + 160, 'Game Over',instructConfig).setOrigin(0.5);
        this.add.text(this.scale.width/2, this.scale.height/2 + 160, 'R to Restart\nM for Main Menu',instructConfig).setOrigin(0.5);
        this.gameOverActivated = true;

    if (Phaser.Input.Keyboard.JustDown(this.keyR)){
        this.bgm.stop();
        this.scene.restart();
    }

    if (Phaser.Input.Keyboard.JustDown(this.keyM)){
        this.bgm.stop()
        this.scene.start('menuScene');
    }

}
}