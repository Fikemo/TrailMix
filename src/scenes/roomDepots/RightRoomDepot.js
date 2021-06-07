import BaseSceneTiled from "../BaseSceneTiled.js";

export default class RightRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.right = true;

        this.static = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "rightRoomDepotJSON",
            player: true,
        });

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

        console.log(this.heldRooms);
    }
}