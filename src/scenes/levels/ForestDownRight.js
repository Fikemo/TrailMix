import BaseSceneTiled from "../BaseSceneTiled.js";

export default class ForestDownRight extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.down = true;
        this.right = true;

        this.musicKey = "forest";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON:"forestDownRightJSON",
            backgroundColor: "#D0F0C0",
            player: true,
        })
    }
}