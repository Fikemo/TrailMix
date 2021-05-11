//import LevelTemplate2 from './scenes/level_0_0.js'
//import game from "../main.js";
export default class LevelTemplate extends Phaser.Scene{
    /**@type {boolean} First false and then set to true when scene is entered for the first time*/
    firstInitialized = false;

    /**@type {string} A string of a random hex value used to set the background color*/
    backgroundColor;

    /**@type {Phaser.Math.Vector2} The coordinate of the scene on the map*/
    coordinate;
    
    constructor(name, coordinate){
        super(name);
        this.coordinate = coordinate;
    }

    preload() {
        
        // set load path
        //this.load.path = './assets/';

        this.load.image('blushie','./assets/blooshie.png');
        
    }

    create(){
        // anything in here will only be called when the scene is first entered
        //if (!this.firstInitialized){
            // get a random
            this.backgroundColor = this.getRandomHexColor();
            //temporary floor
            this.add.rectangle(0, 550, 700, 100, 0xFFF555).setOrigin(0,0);
            //temporary player
            this.add.image(32,500,'blushie').setOrigin(0,0);
            //this.player = new Player(this, this.PLAYER_SPAWN_POS.x, this.PLAYER_SPAWN_POS.y, 'blushie');
            //console.log(this.player);
            this.firstInitialized = true;
        //}

        // set the background color to the randomly generated hex value
        this.cameras.main.setBackgroundColor(this.backgroundColor);

        // get the cursor buttons ready
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){

        // switch to the scene that is above, below, to the right, or to the left of the current scene
        // with the arrow keys
        if (this.cursors){
            if(Phaser.Input.Keyboard.JustDown(this.cursors.up)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.y > 0){
                    this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y - 1}`)
                    //this.add.rectangle(0, 0, 100, 100, 0xFFFFFF).setOrigin(0,0);
                    //this.scene.start('level_0_0');
                    console.log('(0,-1)');
                    
                    // this uses the game map array to load the next scene. This is prefferable
                    this.scene.start(this.game.map[this.coordinate.x][this.coordinate.y - 1].scene.key);
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.y < this.game.mapDimensions.y - 1){
                    //this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y + 1}`);
                    //console.log('(0,1)');
                    // alternatively this uses the appropriate scene name to load the next scene.
                    // This is unprefferable because there may be a change or a mistake that makes it so the scene name doesn't match up with where it is on the map
                    this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y + 1}`)
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x < this.game.mapDimensions.x - 1){
                    //this.scene.start(`level_${this.coordinate.x + 1}_${this.coordinate.y}`);
                    //console.log('(1,1)');
                    this.scene.start(this.game.map[this.coordinate.x + 1][this.coordinate.y].scene.key);
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x > 0){
                    //this.scene.start(`level_${this.coordinate.x - 1}_${this.coordinate.y}`);
                    //console.log('(-1,0)');
                    this.scene.start(this.game.map[this.coordinate.x - 1][this.coordinate.y].scene.key);
                }
            }
        }
    }
    /**Get a string of a random hex value*/
    getRandomHexColor() {
        let letters = '0123456789ABCDEF';
        let hexColor = '#';
        for(let i = 0; i < 6; i++) {
            hexColor += letters[Math.floor(Math.random() * 16)];
        }
        return hexColor;
    }
}