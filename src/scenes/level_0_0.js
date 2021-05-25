
export default class LevelTemplate2 extends Phaser.Scene{
    /**@type {boolean} First false and then set to true when scene is entered for the first time*/
    firstInitialized = false;

    /**@type {string} A string of a random hex value used to set the background color*/
    backgroundColor;

    /**@type {Phaser.Math.Vector2} The coordinate of the scene on the map*/
    coordinate;
    
    constructor(name, coordinate){
        name = super(`level_${this.coordinate.x}_${this.coordinate.y - 1}`);
        this.coordinate = coordinate;
    }


    create() {
        // place tile sprite

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
    
    }
    update(time, delta){
        
    }}
