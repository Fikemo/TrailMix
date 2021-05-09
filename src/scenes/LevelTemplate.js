
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

    create(){
        // anything in here will only be called when the scene is first entered
        if (!this.firstInitialized){
            // get a random
            this.backgroundColor = this.getRandomHexColor();
            this.firstInitialized = true;
        }

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
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.y < this.game.mapDimensions.y - 1){
                    this.scene.start(`level_${this.coordinate.x}_${this.coordinate.y + 1}`)
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x < this.game.mapDimensions.x - 1){
                    this.scene.start(`level_${this.coordinate.x + 1}_${this.coordinate.y}`)
                }
            } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
                // console.log(this.coordinate);
                if (this.coordinate && this.coordinate.x > 0){
                    this.scene.start(`level_${this.coordinate.x - 1}_${this.coordinate.y}`)
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