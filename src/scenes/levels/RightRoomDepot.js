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
        })
    }
}