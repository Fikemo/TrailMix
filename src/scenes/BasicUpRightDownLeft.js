import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";
import Blushie from "../prefabs/Blushie.js";

export default class BasicUpRightDownLeft extends BaseScene{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    init(data){
        this.data.cameFrom = data;
        console.log(this.data);
        // console.log(this.stats.player);
    }

    create(data){
        super.create();

        this.cameras.main.setBackgroundColor(0x666666);
        
        if (this.coordinate.x == 0 && this.coordinate.y == 0){
            this.add.text(100,160, "A and D to move\n\nSpace to jump\n\nESC to open and close the Inventory Menu\n\nClick an icon in the Inventory Menu and then click on the map in the bottom right to place a room").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");
        }

        const map = this.add.tilemap("basicUpRightDownLeftJSON");
        // addTilesetImage(<name of tileset>, <image to use>)
        const tileset = map.addTilesetImage("basicTileSet", "basicTileSet");
        this.blockLayer = map.createLayer("blocks", tileset, 0, 0);
        this.leftDoorLayer = map.createLayer("leftDoor", tileset, 0, 0);
        this.rightDoorLayer = map.createLayer("rightDoor", tileset, 0, 0);
        this.upDoorLayer = map.createLayer("upDoor", tileset, 0, 0);
        this.downDoorLayer = map.createLayer("downDoor", tileset, 0, 0);

        this.blockLayer.setCollisionByProperty({collides: true});
        this.leftDoorLayer.setCollisionByProperty({collides: true});
        this.rightDoorLayer.setCollisionByProperty({collides: true});
        this.downDoorLayer.setCollisionByProperty({collides: true});
        this.upDoorLayer.setCollisionByProperty({collides: true});

        const p1Spawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawn");
        const p1SpawnUp = map.findObject("playerSpawns", obj => obj.name === "playerSpawnUp");
        // console.log(p1Spawn);
        //spawn a blushie
        this.blushie = new Blushie(this, p1Spawn.x + 500, p1Spawn.y, "blushie");

        let playerSpawn;
        switch(this.data.cameFrom){
            case "up":
                playerSpawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawnDown");
            break;
            case "right":
                playerSpawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawnLeft");
            break;
            case "down":
                playerSpawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawnUp");
            break;
            case "left":
                playerSpawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawnRight");
            break;
            default:
                playerSpawn = map.findObject("playerSpawns", obj => obj.name === "playerSpawn");
        }

        this.player = new Player(this, playerSpawn.x, playerSpawn.y, "blushie");
        console.log(this.player);
        // this.collider = this.physics.add.collider(this.player, [this.blockLayer, this.leftDoorLayer, this.rightDoorLayer, this.downDoorLayer, this.upDoorLayer]);

        this.blockCollider = this.physics.add.collider(this.player, this.blockLayer);
        this.upDoorCollider = this.physics.add.collider(this.player, this.upDoorLayer);
        this.rightDoorCollider = this.physics.add.collider(this.player, this.rightDoorLayer);
        this.downDoorCollider = this.physics.add.collider(this.player, this.downDoorLayer);
        this.leftDoorCollider = this.physics.add.collider(this.player, this.leftDoorLayer);

        this.blockCollider = this.physics.add.collider(this.blushie, this.blockLayer);
        this.upDoorCollider = this.physics.add.collider(this.blushie, this.upDoorLayer);
        this.rightDoorCollider = this.physics.add.collider(this.blushie, this.rightDoorLayer);
        this.downDoorCollider = this.physics.add.collider(this.blushie, this.downDoorLayer);
        this.leftDoorCollider = this.physics.add.collider(this.blushie, this.leftDoorLayer);

        this.add.text(10,10,this.coordinate.x + ", " + this.coordinate.y).setColor("black").setFontSize(20).setFontStyle("bold");

        

        // console.log(this.rightDoorCollider);
    }

    update(time, delta){
        this.player.update();
        this.blushie.update();

        this.leftDoorCollider.active = false;

        this.upDoorCollider.active = this.upLocked;
        this.upDoorLayer.alpha = this.upLocked;

        this.rightDoorCollider.active = this.rightLocked;
        this.rightDoorLayer.alpha = this.rightLocked;

        this.downDoorCollider.active = this.downLocked;
        this.downDoorLayer.alpha = this.downLocked;

        this.leftDoorCollider.active = this.leftLocked;
        this.leftDoorLayer.alpha = this.leftLocked;

        if (this.player.y <= 0 - this.player.width / 2){
            this.gameManager.goUp();
        }
        if (this.player.x >= this.scale.width - this.player.width / 2){
            this.gameManager.goRight();
        }
        if (this.player.y >= this.scale.height * 0.75 - this.player.height / 2){
            this.gameManager.goDown();
        }
        if (this.player.x <= 0 - this.player.width / 2){
            this.gameManager.goLeft();
        }
    }

    setDoorLocked(door, locked){

    }
}