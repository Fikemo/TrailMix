import Player from "../prefabs/Player.js";
import BaseSceneTiled from "./BaseSceneTiled.js";

export default class NeonUpRightDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({mapJSON: "NeonUpRightDownLeftJSON"});

        let ps = this.calculatePlayerSpawnPoint();
        this.player = new Player(this, ps.x, ps.y, "blushie");
        this.setPlayerSpawnState();

        this.createPlayerColliders();

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.testDoors = true;
    }

    update(time, delta){
        this.player.update();

        if (Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.turnOffPlatformCollisions();
        }
        // TODO: Maybe find a better way to check when the doors are open or closed that isn't called every frame
        this.setDoors();

        this.checkPlayerExit();
    }
}