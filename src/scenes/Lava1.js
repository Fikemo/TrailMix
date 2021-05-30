
import BaseSceneTiled from "./BaseSceneTiled.js";
import Player from "../prefabs/Player.js";
import Enemy from "../prefabs/Player.js";
 
export default class Lava1 extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);
 
        //this.up = true;
        this.right = true;
        //this.down = true;
        this.left = true;
 
        this.setIcon();
    }
    create(data){
        super.create();
        this.createStandardLevel({mapJSON: "Lava1JSON"});
         // get the player spawn point
         let ps = this.calculatePlayerSpawnPoint();
         // create the player
         this.player = new Player(this, ps.x, ps.y, "blushie"); // Make sure you use "this.player"
         // set the player's properties carried over from the last scene (velocity, position, flip)
         this.setPlayerSpawnState();
         // Create the colliders between the player and the blocks and the doors
         this.createPlayerColliders();
         //this.ENEMY_SPAWN_POS = new Phaser.Math.Vector2(100,430);
         this.enemy = new Enemy(this, ps.x, ps.y, 'enemy');
         this.physics.add.collider(this.enemy, this.groundHitbox);
 
         this.cursors.right.on('down', () => {this.scene.start('gameManagerScene')});
 
         this.enemy.anims.play('enemy_move', true);
 
         // define the key that will be used to turn off the platform collision
         this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }
    update(time,delta){
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
