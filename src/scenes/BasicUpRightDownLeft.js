import Player from "../prefabs/Player.js";
import Blushie from "../prefabs/Blushie.js";
import BaseSceneTiled from "./BaseSceneTiled.js";

export default class BasicUpRightDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;
        this.musicKey = "neon";

        this.setIcon();
    }

    create(data){
        super.create();

        if (this.coordinate.x == 0 && this.coordinate.y == 0){
            this.add.text(90,150, "A, S, and D to move\n\nSpace to jump\n\nESC to open and close the Inventory Menu\n\nClick an icon in the Inventory Menu and then click on the map in the bottom right to place a room").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");
        }

        this.createStandardLevel({mapJSON: "basicUpRightDownLeftJSON"});

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