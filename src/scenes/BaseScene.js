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

        this.iconName = "node_void";

        this.difficulty = 0;
<<<<<<< Updated upstream
=======

        // TODO: Find another way to update which doors need to be unlocked
        this.locksUpdated = false;
>>>>>>> Stashed changes
    }

    setIcon(){
        let frameName = "node"
        if (this.up) frameName += "_u";
        if (this.right) frameName += "_r";
        if (this.down) frameName += "_d";
        if (this.left) frameName += "_l";
        this.iconName = frameName != "node" ? frameName : "node_void";
    }

    setCoordinate(x,y){
        this.coordinate.x = x;
        this.coordinate.y = y;
    }

    resetCoordinate(){
        this.coordinate.x = -1;
        this.coordinate.y = -1;
    }

    create(){
        this.cameras.main.setSize(this.scale.width, 480);
        // console.log(this);
    }
}