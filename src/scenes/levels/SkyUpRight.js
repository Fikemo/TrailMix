import BaseSceneTiled from "../BaseSceneTiled.js";

export default class SkyUpRight extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON:"skyUpRightJSON",
            backgroundColor: "#a7f2fd",
            player: true,
        })
    }
}

