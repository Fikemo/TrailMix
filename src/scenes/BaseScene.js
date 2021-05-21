import GameManager from "./GameManager.js";

export default class BaseScene extends Phaser.Scene{
    constructor(key, gameManager){
        super(key);

        this.key = key;
        this.id = gameManager.sceneID;

        /**@type {GameManager} */
        this.gameManager = gameManager;

        this.coordinate = new Phaser.Math.Vector2(-1,-1);

        this.up = false;
        this.right = false;
        this.down = false;
        this.left = false;

        this.upLocked = true;
        this.rightLocked = true;
        this.downLocked = true;
        this.leftLocked = true;

        this.iconName = "icon_void";

        this.difficulty = 0;

        // TODO: Find another way to update which doors need to be unlocked
        this.locksNeedUpdate = false;
    }

    setIcon(){
        let frameName = "icon"
        if (this.up) frameName += "_u";
        if (this.right) frameName += "_r";
        if (this.down) frameName += "_d";
        if (this.left) frameName += "_l";
        this.iconName = frameName != "icon" ? frameName : "icon_void";
    }

    setCoordinate(x,y){
        this.coordinate.x = x;
        this.coordinate.y = y;
    }

    resetCoordinate(){
        this.coordinate.x = -1;
        this.coordinate.y = -1;
    }

    setLockedSides(up = false, right = false, down = false, left = false){
        this.upLocked = up;
        this.rightLocked = right;
        this.downLocked = down;
        this.leftLocked = left;
    }

    create(){
        this.cameras.main.setSize(this.scale.width, this.game.roomHeight);
        // console.log(this);
    }
}