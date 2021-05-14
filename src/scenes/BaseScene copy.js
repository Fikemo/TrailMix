import GameManager from "./GameManager.js";

export default class BaseScene extends Phaser.Scene{
    constructor(gameManager, typeOfChild){
        gameManager.sceneID++;
        let key = typeOfChild.name + "_" + gameManager.sceneID;
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

        this.difficulty = 0;
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