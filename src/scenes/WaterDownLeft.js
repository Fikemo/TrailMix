import BaseSceneTiled from "./BaseSceneTiled.js";
import Player from"../prefabs/Player.js";

export default class WaterDownLeft extends BaseSceneTiled{
    constructor (key,gameManager){
        super(key, gameManager);

        this.left = true;
        this.down = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({mapJSON: "waterDownLeftJSON"});

        // Get the player spawn point
        let ps = this.calculatePlayerSpawnPoint();
        // Create the player 
        this.player = new Player(this, ps.x, ps.y, "blushie");
        // Set the player's properties carried over from the alst scene (velocity, position, flip)
        this.setPlayerSpawnState();
        // Create the colliders between the player and the blocks and the doors
        this.createPlayerColliders();

        // Define the key that will be used to turn off the platform collision
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(time,delta){
        // Call the player's update method
        this.player.update();

        // Briefly turn off the collision between the player and the platforms so that the player can fall through
        if(Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.turnOffPlatformCollisions();
        }

        // Set doors to be open or closed
        this.setDoors();

        // Check when the player leaves the screen (moves through a door)
        this.checkPlayerExit();

    }
}