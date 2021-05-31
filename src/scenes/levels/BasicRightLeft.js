import BaseSceneTiled from "../BaseSceneTiled.js";
import Player from "../../prefabs/Player.js";
import Saw from "../../prefabs/Saw.js";

export default class BasicRightLeft extends BaseSceneTiled{
    constructor (key, gameManager){
        super(key, gameManager);

        this.right = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        // create level from tilemap
        this.createStandardLevel({mapJSON: "basicRightLeftJSON"});

        // get the player spawn point
        let ps = this.calculatePlayerSpawnPoint();
        // create the player
        this.player = new Player(this, ps.x, ps.y, "blushie"); // Make sure you use "this.player"
        // set the player's properties carried over from the last scene (velocity, position, flip)
        this.setPlayerSpawnState();
        // Create the colliders between the player and the blocks and the doors
        this.createPlayerColliders();

        // define the key that will be used to turn off the platform collision
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(time, delta){
        // call the player's update method
        this.player.update();

        // briefly turn off the collision between the player and the platforms so that the player can fall through
        if (Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.turnOffPlatformCollisions();
        }

        // set doors to be open or closed
        this.setDoors();

        // check when the player leaves the screen (moves through a door)
        this.checkPlayerExit();
    }
}