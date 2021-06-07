import BaseSceneTiled from "../BaseSceneTiled.js"

export default class WaterRightLeftMedium extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        this.right = true;
        // this.down = true;
        this.left = true;

        this.musicKey = "water";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "WaterRightLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: "#131e28",
            player: true,
        })
    }
}