import BaseSceneTiled from "../BaseSceneTiled.js";

export default class UpRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "rightRoomDepotJSON",
            player: true,
        })
    }
}