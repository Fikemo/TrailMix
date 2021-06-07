import BaseSceneTiled from "../BaseSceneTiled.js";

export default class LeftRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.left = true;

        this.static = true;

        this.musicKey = "basic";

        this.sfxLvl;
        this.soundPlayed = false;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "leftRoomDepotJSON",
            player: true,
        });

        if (this.player && this.heldRooms){
            if (this.soundPlayed == false) {
                this.sfxLvl = this.sound.add('sfx_levelsAcquired', {volume: 0.1});
                this.sfxLvl.play();
                this.soundPlayed = true;
            }
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