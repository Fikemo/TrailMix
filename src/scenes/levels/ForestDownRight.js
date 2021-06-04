import BaseSceneTiled from "../BaseSceneTiled.js";

export default class ForestDownRight extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.down = true;
        this.right = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON:"forestDownRightJSON",
            backgroundColor: "#a7f2fd",
            player: true,
        })
    }
}