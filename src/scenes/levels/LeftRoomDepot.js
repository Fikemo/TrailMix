import BaseSceneTiled from "../BaseSceneTiled.js";

export default class LeftRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.left = true;

        this.static = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "leftRoomDepotJSON",
            player: true,
        });
    }
}