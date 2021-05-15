import BaseScene from "./BaseScene.js";

export default class TestRight extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);
        this.right = true;

        this.setIcon();
    }

    create(){
        super.create();
        // console.log(this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setBackgroundColor(0xFFFFFF);

        this.upWall = this.add.graphics();
        this.setWall(this.upWall, 0, 0, this.scale.width,16);

        this.downWall = this.add.graphics();
        this.setWall(this.downWall, 0, 480 - 16, this.scale.width,16);

        this.leftWall = this.add.graphics();
        this.setWall(this.leftWall, 0, 0, 16, 480);

        this.add.text(0,0,this.coordinate.x + ", " + this.coordinate.y);

    }

    update(time, delta){
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)){
            // console.log("attempting to go right");
            this.gameManager.goRight();
        }
    }

    setWall(wall, x, y, w, h){
        wall.clear();
        wall.fillStyle(0x000000);
        wall.fillRect(x, y, w, h);
        return wall;
    }
}