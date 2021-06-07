import game from "../main.js";


export default class Credits extends Phaser.Scene{
    constructor(){
        super("creditScene");
    }

    preload() {
     
        
    }

    create(){
        this.cursors = this.input.keyboard.createCursorKeys();
        let instructConfig = {
            fontFamily: 'Courier',
            fontSize: '18px',
            //backgroundColor: '#A3C941',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // add logo
        //this.add.image(game.config.width/ 2, game.config.height/2 - 60, 'logo');
        

        //add text
        // this.add.text(game.config.width/2, game.config.height/2 - 100, 'Finn Morrison: Lead Programmer / Lead Designer / UX Designer\nEmersen Lorenz: Sound and Music Producer\nMarla De Leon: Lead Artist / Level Designer\nAubrey Schelbauer: Supporting Artist / Supporting Programmer \n/ Level Designer', instructConfig).setOrigin(0.5);
        //this.add.text(game.config.width/2, game.config.height/2 - 100, 'Press Shift to return', instructConfig).setOrigin(0.5);

        let yOffset = 120;

        this.add.bitmapText(this.scale.width/2, yOffset, "upheaval", "Finn Morrison\nLead Programmer / Lead Designer / UX Designer", -20, 1).setTint(0xDCD0FF).setOrigin(0.5, 0);
        this.add.bitmapText(this.scale.width/2, yOffset + 50, "upheaval", "Marla De Leon\nLead Artist / Level Designer / UI Designer", -20, 1).setTint(0xecb7bf).setOrigin(0.5, 0);
        this.add.bitmapText(this.scale.width/2, yOffset + 100, "upheaval", "Emersen Lorenz\nSound and Music Producer / Assistant Programmer / Level Designer", -20, 1).setTint(0xDBEB14).setOrigin(0.5, 0);
        this.add.bitmapText(this.scale.width/2, yOffset + 150, "upheaval", "Aubrey Schelbauer\nSupporting Artist / Level Designer / UI Designer", -20, 1).setTint(0xfdc48a).setOrigin(0.5, 0);

        this.start = this.add.image(game.config.width/2 + 40, game.config.height/2 + 200, 'return').setScale(0.5).setOrigin(0.5).setInteractive();
        this.start.on("pointerdown", () => {
                this.scene.start('menuScene');
                this.cursorClick = this.sound.add('sfx_cursorClick', {volume: 0.1});
                this.cursorClick.play();
        }, this);
    }

    update(){

    }
}