import BaseSceneTiled from "../BaseSceneTiled.js";

export default class DownRoomDepot extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.down = true;

        this.static = true;

        this.musicKey = "basic";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "downRoomDepotJSON",
            player: true,
        })
    }
}