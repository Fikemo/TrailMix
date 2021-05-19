import BaseScene from "./BaseScene.js";
import Player from "../prefabs/Player.js";

export default class BasicUpRightDownLeft extends BaseScene{
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

        this.cameras.main.setBackgroundColor(0x666666);
        
        if (this.coordinate.x == 0 && this.coordinate.y == 0){
            this.add.text(150,260, "A and D to move\n\nSpace to jump\n\nESC to open and close the Inventory Menu\n\nClick an icon in the Inventory Menu and then click on the map in the bottom right to place a room").setAlign('center').setColor("white").setWordWrapWidth(200).setFontSize(20).setFontStyle("bold");
        }

        const map = this.add.tilemap("tilemapJSON");
        // addTilesetImage(<name of tileset>, <image to use>)
        const tileset = map.addTilesetImage("basic_tileset", "tileset");
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

        const p1Spawn = map.findObject("playerSpawn", obj => obj.name === "playerSpawn");
        // console.log(p1Spawn);
        this.player = new Player(this, p1Spawn.x, p1Spawn.y, "blushie");
        // this.collider = this.physics.add.collider(this.player, [this.blockLayer, this.leftDoorLayer, this.rightDoorLayer, this.downDoorLayer, this.upDoorLayer]);

        this.blockCollider = this.physics.add.collider(this.player, this.blockLayer);
        this.upDoorCollider = this.physics.add.collider(this.player, this.upDoorLayer);
        this.rightDoorCollider = this.physics.add.collider(this.player, this.rightDoorLayer);
        this.downDoorCollider = this.physics.add.collider(this.player, this.downDoorLayer);
        this.leftDoorCollider = this.physics.add.collider(this.player, this.leftDoorLayer);

        this.add.text(20,20,this.coordinate.x + ", " + this.coordinate.y).setColor("black").setFontSize(20).setFontStyle("bold");

        

        // console.log(this.rightDoorCollider);
    }

    update(time, delta){
        this.player.update();
        this.leftDoorCollider.active = false;

        this.upDoorCollider.active = this.upLocked;
        this.upDoorLayer.alpha = this.upLocked;

        this.rightDoorCollider.active = this.rightLocked;
        this.rightDoorLayer.alpha = this.rightLocked;

        this.downDoorCollider.active = this.downLocked;
        this.downDoorLayer.alpha = this.downLocked;

        this.leftDoorCollider.active = this.leftLocked;
        this.leftDoorLayer.alpha = this.leftLocked;

        if (this.player.y <= 0 + this.player.width / 2){
            this.gameManager.goUp();
        }
        if (this.player.x >= this.scale.width - this.player.width / 2){
            this.gameManager.goRight();
        }
        if (this.player.y >= this.scale.height * 0.75 - this.player.height / 2){
            this.gameManager.goDown();
        }
        if (this.player.x <= 0 + this.player.width / 2){
            this.gameManager.goLeft();
        }
    }

    setDoorLocked(door, locked){

    }
}