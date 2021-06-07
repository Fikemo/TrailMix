import BaseSceneTiled from "../BaseSceneTiled.js";

export default class SkyUpDownMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.down = true;

        this.musicKey = "sky";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON:"skyUpDownJSON",
            backgroundColor: "#a7f2fd",
            player: true,
        })
    }
}

