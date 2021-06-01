import BaseSceneTiled from "../BaseSceneTiled.js";

export default class Test extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up
        this.right = true;
        this.down = true;
        this.left = true;

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "testJSON",
            backgroundColor: 0xf0e17,
            player: true,
        })
    }
}