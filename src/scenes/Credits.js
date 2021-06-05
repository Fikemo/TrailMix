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
        this.add.text(game.config.width/2, game.config.height/2 + 100, 'Finn Morrison: Lead Programmer / Lead Designer / UX Designer\nEmersen Lorenz: Sound and Music Producer\nMarla De Leon: Lead Artist / Level Designer\nAubrey Schelbauer: Supporting Artist / Supporting Programmer \n/ Level Designer', instructConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 - 100, 'Press Shift to return', instructConfig).setOrigin(0.5);

        this.cursors.shift.on('down', () => {this.scene.start('menuScene')});
    }

    update(){

    }
}