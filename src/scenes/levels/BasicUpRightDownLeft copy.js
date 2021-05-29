import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";
import PlatformCollider from "../prefabs/PlatformCollider.js";
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
        this.data.lastScene = data;
        console.log(this.data);
    }

    create(data){
        super.create();

        this.cameras.main.setBackgroundColor(0x666666);

        let config = {
            mapJSON: "basicUpRighDonwLeftJSON",
            tilesetKey: "basicTileSet",
            tilesetImage: "basicTileSet",
        }
        
        if (this.coordinate.x == 0 && this.coordinate.y == 0){
            this.add.text(100,160, "A, S, and D to move\n\nSpace to jump\n\nESC to open and close the Inventory Menu\n\nClick an icon in the Inventory Menu and then click on the map in the bottom right to place a room").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");

            this.add.text(500,160, "There is currently only one room type.\nMore rooms coming soon!\n\nThis little guy down here is a friendly npc.\nThey're just here to have fun").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");
        }

        // create tile layers
        this.map = this.add.tilemap("basicUpRightDownLeftJSON");
        console.log(this.map);
        this.tileset = this.map.addTilesetImage("basicTileSet", "basicTileSet");

        // this.blockLayer = this.map.createLayer("blocks", this.tileset, 0,0).setCollisionByProperty({collides: true});
        // this.upDoorLayer = this.map.createLayer("upDoor", this.tileset, 0, 0).setCollisionByProperty({collides: true});
        // this.rightDoorLayer = this.map.createLayer("rightDoor", this.tileset, 0, 0).setCollisionByProperty({collides: true});
        // this.downDoorLayer = this.map.createLayer("downDoor", this.tileset, 0, 0).setCollisionByProperty({collides: true});
        // this.leftDoorLayer = this.map.createLayer("leftDoor", this.tileset, 0, 0).setCollisionByProperty({collides: true});
        // {this.blockLayer, this.upDoorLayer, this.rightDoorLayer, this.downDoorLayer, this.leftDoorLayer} = this.createLayers(this.map, this.tileset, ["blocks", "upDoor", "rightDoor", "downDoor", "leftDoor"], true);
        // this.blockLayer = this.createLayers(this.map, this.tileset, "blocks", true);
        const {blocks, downDoor, leftDoor, rightDoor, upDoor} = this.createLayers(this.map, this.tileset, [
            "blocks",
            "upDoor",
            "rightDoor",
            "downDoor",
            "leftDoor",
        ], true)
        console.log(blocks);
        this.blockLayer = blocks;
        this.upDoorLayer = upDoor;
        this.rightDoorLayer = rightDoor;
        this.downDoorLayer = downDoor;
        this.leftDoorLayer = leftDoor;
        
        // create pass through platform objects
        this.platformGroup = this.add.group();
        this.map.findObject("platformObjects", platformObject => {
            this.platformGroup.add(new PlatformCollider(this, platformObject.x, platformObject.y, platformObject.width, platformObject.height));
        })

        let enemyPath = this.map.findObject("enemyPath", path => path.name === "enemyPath");
        console.log(enemyPath);

        // create the player
        let playerSpawnObjectName = "playerSpawn";
        if (this.data.lastScene.cameFrom) playerSpawnObjectName += this.data.lastScene.cameFrom;
        console.log(playerSpawnObjectName)
        // set the player's spawn
        let playerSpawnObject;
        let playerSpawn = {x: undefined, y: undefined};
        this.defaultSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawn");
        this.upSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawnUp");
        this.rightSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawnRight");
        this.downSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawnDown");
        this.leftSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawnLeft");
        switch(this.data.lastScene.cameFrom){
            case "up":
                playerSpawnObject = this.downSpawnObject;
                playerSpawn.x = this.data.lastScene.playerPosition ? playerSpawnObject.x - this.data.lastScene.playerPosition.upDifferenceX : playerSpawnObject.x;
                playerSpawn.y = playerSpawnObject.y;
            break;
            case "right":
                playerSpawnObject = this.leftSpawnObject;
                playerSpawn.x = playerSpawnObject.x;
                playerSpawn.y = this.data.lastScene.playerPosition ? playerSpawnObject.y - this.data.lastScene.playerPosition.leftDifferenceY : playerSpawnObject.y;
            break;
            case "down":
                playerSpawnObject = this.upSpawnObject;
                playerSpawn.x = this.data.lastScene.playerPosition ? playerSpawnObject.x - this.data.lastScene.playerPosition.downDifferenceX : playerSpawnObject.x;
                playerSpawn.y = playerSpawnObject.y;
            break;
            case "left":
                playerSpawnObject = this.rightSpawnObject;
                playerSpawn.x = playerSpawnObject.x;
                playerSpawn.y = this.data.lastScene.playerPosition ? playerSpawnObject.y - this.data.lastScene.playerPosition.rightDifferenceY : playerSpawnObject.y;
            break;
            default:
                playerSpawnObject = this.map.findObject("playerSpawns", spawnPoint => spawnPoint.name === "playerSpawn");
                playerSpawn.x = playerSpawnObject.x;
                playerSpawn.y = playerSpawnObject.y;
        }
        this.player = new Player(this, playerSpawn.x, playerSpawn.y, "blushie");
        if (this.data.lastScene.velocity){
            this.player.setVelocity(this.data.lastScene.velocity.x, this.data.lastScene.velocity.y);
        }
        if (this.data.lastScene.flip){
            this.player.setFlipX(this.data.lastScene.flip);
        }

        // setup colliders
        this.blockCollider = this.physics.add.collider(this.player, this.blockLayer);
        this.upDoorCollider = this.physics.add.collider(this.player, this.upDoorLayer);
        this.rightDoorCollider = this.physics.add.collider(this.player, this.rightDoorLayer);
        this.downDoorCollider = this.physics.add.collider(this.player, this.downDoorLayer);
        this.leftDoorCollider = this.physics.add.collider(this.player, this.leftDoorLayer);

        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup);


        this.blushie = new Blushie(this, this.defaultSpawnObject.x + 500, this.defaultSpawnObject.y, "blushie");
        this.physics.add.collider(this.blushie, this.blockLayer);
        this.physics.add.collider(this.blushie, this.upDoorLayer);
        this.physics.add.collider(this.blushie, this.rightDoorLayer);
        this.physics.add.collider(this.blushie, this.downDoorLayer);
        this.physics.add.collider(this.blushie, this.leftDoorLayer);

        this.add.text(10, 10, this.coordinate.x + ", " + this.coordinate.y).setColor("black").setFontSize(20).setFontStyle("bold");

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update(time, delta){
        this.player.update();
        this.blushie.update();
        this.setDoorLocked(this.upDoorCollider, this.upDoorLayer, this.upLocked);
        this.setDoorLocked(this.rightDoorCollider, this.rightDoorLayer, this.rightLocked);
        this.setDoorLocked(this.downDoorCollider, this.downDoorLayer, this.downLocked);
        this.setDoorLocked(this.leftDoorCollider, this.leftDoorLayer, this.leftLocked);

        // set platform colliders to inactive to let player fall through them
        if (Phaser.Input.Keyboard.JustDown(this.keyS)){
            this.platformCollider.active = false;
            this.time.delayedCall(100, () => {this.platformCollider.active = true});
        }

        let playerPhysics = {
            playerPosition: {
                x: this.player.x,
                y: this.player.y,
                upDifferenceX: this.upSpawnObject.x - this.player.x,
                rightDifferenceY: this.rightSpawnObject.y - this.player.y,
                downDifferenceX: this.downSpawnObject.x - this.player.x,
                leftDifferenceY: this.leftSpawnObject.y - this.player.y
            },
            velocity: {
                x: this.player.body.velocity.x,
                y: this.player.body.velocity.y
            },
            flip: this.player.flipX
        }
        if (this.player.y <= 0 - this.player.width / 2){
            console.log(playerPhysics);
            this.gameManager.goUp(playerPhysics);
        }
        if (this.player.x >= this.scale.width - this.player.width / 2){
            this.gameManager.goRight(playerPhysics);
        }
        if (this.player.y >= this.scale.height * 0.75 - this.player.height / 2){
            this.gameManager.goDown(playerPhysics);
        }
        if (this.player.x <= 0 - this.player.width / 2){
            this.gameManager.goLeft(playerPhysics);
        }

    }

    setDoorLocked(doorCollider, doorLayer, locked){
        doorCollider.active = locked;
        doorLayer.alpha = locked;
    }

    createLayers(map, tileSet, layerNames, collision = false, x = 0, y = 0){
        if (Array.isArray(layerNames)){
            let layers = {};
            layerNames.forEach(layerName => {
                layers[layerName] = map.createLayer(layerName, tileSet, x, y);
                if (collision) layers[layerName].setCollisionByProperty({collides: true});
            })
            console.log(layers);
            return layers;
        } else {
            let layer = map.createLayer(layerNames, tileSet, x, y);
            if (collision) layer.setCollisionByProperty({collides: true});
            return layer;
        }
    }
}