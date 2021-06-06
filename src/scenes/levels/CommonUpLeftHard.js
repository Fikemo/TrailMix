import BaseSceneTiled from "../BaseSceneTiled.js";

export default class CommonUpLeftHard extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true,
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "commonUpLeftHardJSON",
            player: true,
        })
    }
}