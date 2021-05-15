import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";

export default class TestPlayer extends BaseScene{
    constructor(key, gameManager){
        // call base scene's constructor
        super(key, gameManager);

        // set what directions should be open for this room (ex. this.right = true);
        this.right = true;

        // Set the scene's icon name based on the open directions
        // should always be at the bottom of constructor
        this.setIcon();
    }

    create(data){
        super.create();

        // create the environment
        this.cameras.main.setBackgroundColor(0x666666);
        this.groundHitbox = this.physics.add.sprite(0,480-16);
        this.groundHitbox.body.setImmovable(true);
        this.groundHitbox.body.setAllowGravity(false);
        this.groundHitbox.body.setSize(this.scale.width + 200, 16, false);
        this.groundHitbox.setOrigin(0);

        this.upWall = this.add.graphics();
        this.setWall(this.upWall, 0, 0, this.scale.width,16);

        this.downWall = this.add.graphics();
        this.setWall(this.downWall, 0, 480 - 16, this.scale.width,16);

        this.leftWall = this.add.graphics();
        this.setWall(this.leftWall, 0, 0, 16, 480);

        this.add.text(0,0,this.coordinate.x + ", " + this.coordinate.y);

        // create the player
        this.PLAYER_SPAWN_POS = new Phaser.Math.Vector2(60, 120);
        this.player = new Player(this, this.PLAYER_SPAWN_POS.x, this.PLAYER_SPAWN_POS.y, 'blushie');
        // this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.groundHitbox);
    }

    update(time, delta){
        this.player.update();

        if (this.player.x > this.scale.width + this.player.width){
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