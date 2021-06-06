import BaseSceneTiled from "../BaseSceneTiled.js"

export default class LavaUpDownLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        this.up = true;
        // this.right = true;
        this.down = true;
        this.left = true;

        this.musicKey = "lava";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "LavaUpDownLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0x243f72,
            player: true,
        })
    }
}