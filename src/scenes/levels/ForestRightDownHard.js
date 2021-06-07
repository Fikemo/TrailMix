import BaseSceneTiled from "../BaseSceneTiled.js";

export default class ForestRightDownHard extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        this.right = true;
        this.down = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "forestRightDownHardJSON",
            player: true,
        })
    }
}