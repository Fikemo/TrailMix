import BaseSceneTiled from "../BaseSceneTiled.js";

export default class LavaUpRightDownLeftHard extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "lavaUpRightDownLeftHardJSON",
            player: true,
        })
    }
}