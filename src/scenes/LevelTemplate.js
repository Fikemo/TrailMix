
export default class LevelTemplate extends Phaser.Scene{
    firstInitialized = false;
    backgroundColor;
    coordinate;
    
    constructor(name, coordinate){
        super(name);
        this.coordinate = coordinate;
    }

    create(){
        if (!this.firstInitialized){
            this.backgroundColor = this.getRandomHexColor();
        }
        // console.log(this);
        this.cameras.main.setBackgroundColor(this.backgroundColor);
        // this.cameras.main.backgroundColor = new Phaser.Display.Color(Phaser.Math.Between(0, 255),Phaser.Math.Between(0, 255),Phaser.Math.Between(0, 255),1);
        this.cursors = this.input.keyboard.createCursorKeys();
        
        this.firstInitialized = true;
    }

    update(){
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

    getRandomHexColor() {
        let letters = '0123456789ABCDEF';
        let hexColor = '#';
        for(let i = 0; i < 6; i++) {
            hexColor += letters[Math.floor(Math.random() * 16)];
        }
        return hexColor;
    }
}