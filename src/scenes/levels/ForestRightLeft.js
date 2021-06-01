import BaseSceneTiled from "../BaseSceneTiled.js"

export default class ForestRightLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = false;
        this.right = true;
        // this.down = false;
        this.left = true;

        this.musicKey = "forest";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "forestRightLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0x243f72,
            player: true,
        })
    }
}