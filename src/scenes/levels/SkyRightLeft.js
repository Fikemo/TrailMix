import BaseSceneTiled from "../BaseSceneTiled.js"

export default class SkyRightLeft extends BaseSceneTiled{
    constructor(key, gameManager){
        super(key, gameManager);

        // this.up = true;
        this.right = true;
        // this.down = true;
        this.left = true;

        this.musicKey = "sky";

        this.setIcon();
    }

    create(data){
        super.create();

        this.createStandardLevel({
            mapJSON: "skyRightLeftJSON",
            // backgroundImage: <background image key>
            backgroundColor: 0x243f72,
            player: true,
        })
    }
}