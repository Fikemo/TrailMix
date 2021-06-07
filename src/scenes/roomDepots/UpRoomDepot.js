import BaseSceneTiled from "../BaseSceneTiled.js";

export default class UpRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;

        this.static = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "upRoomDepotJSON",
            player: true,
        })

        if (this.player && this.heldRooms){
            while(this.heldRooms.length != 0){
                let sceneType = this.heldRooms.pop();
                let objectToAddToPlayerBlushieInventory = {
                    scene: this,
                    sceneType: sceneType,
                }

                this.gameManager.playerBlushieInventory.push(objectToAddToPlayerBlushieInventory);
            }
            // console.log(this.heldRooms);
        }

        this.terminalPointObj = this.map.objects.find(obj => obj.name === "terminalObject").objects.find(obj => obj.name === "terminalScreen");
        this.terminalObj = this.map.objects.find(obj => obj.name === "terminalObject").objects.find(obj => obj.name === "terminal");

        this.terminalOnScreen = this.add.image(this.terminalPointObj.x, this.terminalPointObj.y, "terminalOnScreenSmall").setOrigin(0);

        this.terminalHitbox = this.physics = this.physics.add.sprite(this.terminalObj.x, this.terminalObj.y);
        this.terminalHitbox.setSize(this.terminalObj.width, this.terminalObj.height);
        this.terminalHitbox.setOrigin(0);
        this.terminalHitbox.body.setOffset(0);
        this.terminalHitbox.body.setAllowGravity(false);
        this.terminalHitbox.body.setImmovable(true);

        this.terminalHitbox

    }
}