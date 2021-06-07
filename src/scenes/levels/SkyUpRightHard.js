import BaseSceneTiled from "../BaseSceneTiled.js";

export default class SkyUpRightHard extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true,
        this.right = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "skyUpRightHardJSON",
            backgroundColor:  "#a7f2fd",
            player: true,
        })
    }
}