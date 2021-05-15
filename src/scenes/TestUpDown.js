import BaseScene from "./BaseScene.js";

export default class TestUpDown extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);
        this.up = true;
        this.down = true;
        
        this.setIcon();
    }

    create(){
        super.create();
        // console.log(this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor(0x0000FF);

        this.rightWall = this.add.graphics();
        this.setWall(this.rightWall, this.scale.width - 16, 0, 16, this.scale.height);

        this.leftWall = this.add.graphics();
        this.setWall(this.leftWall, 0, 0, 16, 480);

        this.add.text(0,0,this.coordinate.x + ", " + this.coordinate.y);
    }

    update(time, delta){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)){
            // console.log("attempting to go left");
            this.gameManager.goUp();
        }
        else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)){
            // console.log("attempting to go down");
            this.gameManager.goDown();
        }
    }

    setWall(wall, x, y, w, h){
        wall.clear();
        wall.fillStyle(0x000000);
        wall.fillRect(x, y, w, h);
        return wall;
    }
}