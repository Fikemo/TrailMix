import BaseSceneTiled from "../BaseSceneTiled.js";

export default class TestRightDownLeft extends BaseSceneTiled {
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        this.right = true;
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "testUpRightDownLeftJSON",
            player: true,
        })
    }
}