import BaseScene from "./BaseScene.js";

export default class TestDownLeft extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);
        this.down = true;
        this.left = true;
        
        this.setIcon();
    }

    create(){
        super.create();
        // console.log(this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor(0xFF0000);

        this.upWall = this.add.graphics();
        this.setWall(this.upWall, 0, 0, this.scale.width,16);

        this.rightWall = this.add.graphics();
        this.setWall(this.rightWall, this.scale.width - 16, 0, 16, this.scale.height);

    }

    update(time, delta){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.left)){
            // console.log("attempting to go left");
            this.gameManager.goLeft();
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